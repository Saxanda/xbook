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
import app.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service

@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final UserService userService;
    private final FriendService friendService;
    private final PostRepository postRepository;

    public Notification createNotification(Notification notification) {

        return notificationRepository.save(notification);
    }

    public List<NotificationResponse> getRecipientNotifications(Long recipientId) {
        List<Notification> notifications = notificationRepository.findByRecipient(recipientId);
        return notifications.stream()
                .map(notificationMapper::toNotificationResponse)
                .collect(Collectors.toList());
    }

    public NotificationResponse markNotificationAsRead(Long notificationId) {

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with ID: " + notificationId));

        notification.setReadStatus(true);

        notificationRepository.save(notification);

        return notificationMapper.toNotificationResponse(notification);

    }

    public void postNotification(Post post) {
        // Determine the user who created the post
        Long userId = post.getUser().getId();

        // Get the list of friends for the user
        List<User> friends = friendService.getAllFriends(userId);

        // Notification type based on the post type
        NotificationType type = post.getType() == PostType.REPOST ? NotificationType.REPOST : NotificationType.NEW_POST;

        // Current time for the timestamp
        LocalDateTime now = LocalDateTime.now();

        // Create and send a notification for each friend
        for (User friend : friends) {
            Notification notification = new Notification(
                    post.getUser(),         // sender
                    friend.getId(),         // recipient
                    "Customised message here", // message
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
        List<User> friends = friendService.getAllFriends(userId);

        // Notification type based on the post type
        NotificationType type = NotificationType.NEW_COMMENT;

        // Current time for the timestamp
        LocalDateTime now = LocalDateTime.now();

        // Create and send a notification for each friend
        for (User friend : friends) {
            Notification notification = new Notification(
                    comment.getUser(),         // sender
                    friend.getId(),         // recipient
                    "Customised message here", // message
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
        List<User> friends = friendService.getAllFriends(userId);

        // Notification type based on the post type
        NotificationType type = NotificationType.LIKE;

        // Current time for the timestamp
        LocalDateTime now = LocalDateTime.now();

        // Create and send a notification for each friend
        for (User friend : friends) {
            Notification notification = new Notification(
                    like.getUser(),         // sender
                    friend.getId(),         // recipient
                    "Customised message here", // message
                    type,                   // type
                    like.getPost(),      // related post
                    now,                    // timestamp
                    false                   // readStatus
            );

            createNotification(notification);
        }

    }
}