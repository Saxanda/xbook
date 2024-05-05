package app.service;

import app.dto.mapper.NotificationMapper;
import app.dto.request.NotificationRequest;
import app.dto.response.NotificationResponse;
import app.entity.Notification;
import app.entity.Post;
import app.entity.User;
import app.exception.ResourceNotFoundException;
import app.repository.NotificationRepository;
import app.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service

@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final UserService userService;
    private final FriendService friendService;
    private final PostRepository postRepository;

    public Notification createNotification(NotificationRequest notificationRequest) {
        // Check User, Friend  from database
        User sender = userService.findById(notificationRequest.getSenderId()).get();
        friendService.getFriend(notificationRequest.getRecipientId(), notificationRequest.getSenderId());

        // Post associated with the notification
        Post post = null;
        if (notificationRequest.getPostId() != null) {
            Optional<Post> optionalPost = postRepository.findById(notificationRequest.getPostId());
            post = optionalPost.orElseThrow(() -> new ResourceNotFoundException("Post not found with ID: " + notificationRequest.getPostId()));
        }

        // Create a new Notification
        Notification notification = new Notification();
        notification.setMessage(notificationRequest.getMessage());
        notification.setTimestamp(LocalDateTime.now());
        notification.setSender(sender);
        notification.setPost(post);

        notification.setRecipient(notificationRequest.getRecipientId());
        notification.setReadStatus(false);

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
}
