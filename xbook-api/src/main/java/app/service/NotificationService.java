package app.service;

import app.dto.mapper.NotificationMapper;
import app.dto.response.NotificationResponse;
import app.entity.Comment;
import app.entity.Like;
import app.entity.Notification;
import app.entity.NotificationType;
import app.entity.Post;
import app.entity.PostType;
import app.entity.User;
import app.exception.ResourceNotFoundException;
import app.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.stream.Collectors;

@Service

@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final FriendService friendService;
    private final TaskScheduler taskScheduler;

    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public List<NotificationResponse> getRecipientNotifications(Long recipientId) {
        List<Notification> notifications = notificationRepository.findByRecipient_Id(recipientId);

        return notifications.stream()
                .map(notificationMapper::toNotificationResponse)
                .collect(Collectors.toList());
    }

    public Page<NotificationResponse> getPageRecipientNotifications(Long recipientId, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return notificationRepository.findByRecipient(recipientId, pageable)
                .map(notificationMapper::toNotificationResponse);
    }

    public NotificationResponse markNotificationAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with ID: " + notificationId));

        notification.setReadStatus(true);
        notificationRepository.save(notification);

        // Deletion task to run after 5 minutes
        taskScheduler.schedule(() -> deleteNotification(notification.getId()),
                LocalDateTime.now().plusSeconds(5).atZone(ZoneId.systemDefault()).toInstant());

        return notificationMapper.toNotificationResponse(notification);
    }

    private void deleteNotification(Long notificationId) {
        notificationRepository.deleteById(notificationId);
    }

    public void postNotification(Post post) {
        // Determine the user who created the post
        Long userId = post.getUser().getId();

        // Get the list of friends for the user
        List<User> friends = friendService.getAll(userId);

        // Notification type based on the post type
        NotificationType type = post.getType() == PostType.REPOST ? NotificationType.REPOST : NotificationType.NEW_POST;

        // Current time for the timestamp
        LocalDateTime now = LocalDateTime.now();

        // Create and send a notification for each friend
        for (User friend : friends) {
            Notification notification = new Notification(
                    post.getUser(),         // sender
                    friend,         // recipient
                    "New post", // message
                    type,                   // type
                    post,                   // related post
                    now,                    // timestamp
                    false                   // readStatus
            );

            createNotification(notification);
        }
    }

    public void commentNotification(Comment comment) {
        // Determine the user who created the comment
        Long userId = comment.getUser().getId();

        // Get the list of friends for the user
        List<User> friends = friendService.getAll(userId);

        // Notification type based on the post type
        NotificationType type = NotificationType.NEW_COMMENT;

        // Current time for the timestamp
        LocalDateTime now = LocalDateTime.now();

        // Create and send a notification for each friend
        for (User friend : friends) {
            Notification notification = new Notification(
                    comment.getUser(),         // sender
                    friend,         // recipient
                    "New Comment", // message
                    type,                   // type
                    comment.getPost(),      // related post
                    now,                    // timestamp
                    false                   // readStatus
            );

            createNotification(notification);
        }
    }

    public void likeNotification(Like like) {
        // Determine the user who created the like
        Long userId = like.getUser().getId();

        // Get the list of friends for the user
        List<User> friends = friendService.getAll(userId);

        // Notification type based on the post type
        NotificationType type = NotificationType.LIKE;

        // Current time for the timestamp
        LocalDateTime now = LocalDateTime.now();

        // Create and send a notification for each friend
        for (User friend : friends) {
            Notification notification = new Notification(
                    like.getUser(),         // sender
                    friend,         // recipient
                    "Post liked", // message
                    type,                   // type
                    like.getPost(),      // related post
                    now,                    // timestamp
                    false                   // readStatus
            );

            createNotification(notification);
        }
    }
}