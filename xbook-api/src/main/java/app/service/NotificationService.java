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

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final UserService userService;

    public Notification createNotification(NotificationRequest notificationRequest) {
        // Fetch the user from database

        User recipient = userService.findById(notificationRequest.getRecipient())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + notificationRequest.getRecipient()));

        // Create a new Notification entity
        Notification notification = new Notification();
        notification.setMessage(notificationRequest.getMessage());
        notification.setTimestamp(LocalDateTime.now());
        notification.setRecipient(recipient);
        notification.setReadStatus(false);

        // Save the Notification entity to the database
        return notificationRepository.save(notification);
    }

    public NotificationResponse markNotificationAsRead(Long notificationId) {

        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with ID: " + notificationId));

        notification.setReadStatus(true);

        notificationRepository.save(notification);

        return notificationMapper.toNotification(notification);

    }
}
