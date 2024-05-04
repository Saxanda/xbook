package app.service;

import app.dto.mapper.NotificationMapper;
import app.dto.request.NotificationRequest;
import app.dto.response.NotificationResponse;
import app.entity.Notification;
import app.entity.User;
import app.exception.ResourceNotFoundException;
import app.repository.NotificationRepository;
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

    public Notification createNotification(NotificationRequest notificationRequest) {
        // User from database
        User sender =userService.findById(notificationRequest.getSenderId())
                .orElseThrow(() -> new IllegalArgumentException("User not found with sender ID: " + notificationRequest.getSenderId()));
        User recipient = userService.findById(notificationRequest.getRecipientId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + notificationRequest.getRecipientId()));

        // Create a new Notification
        Notification notification = new Notification();
        notification.setMessage(notificationRequest.getMessage());
        notification.setTimestamp(LocalDateTime.now());
        notification.setSender(sender);
        notification.setRecipient(recipient);
        notification.setReadStatus(false);
        return notificationRepository.save(notification);
    }

    public List<NotificationResponse> getUserNotifications(Long userId) {
        List<Notification> notifications = notificationRepository.findByRecipientId(userId);
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
