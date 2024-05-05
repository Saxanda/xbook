package app.controller;

import app.dto.request.NotificationRequest;
import app.dto.response.NotificationResponse;
import app.entity.Notification;
import app.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping("/notification")
    public ResponseEntity<String> createNotification(@RequestBody NotificationRequest notificationRequestRequest) {
        notificationService.createNotification(notificationRequestRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("Note created");
    }

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<NotificationResponse> markNotificationAsRead(@PathVariable Long notificationId) {
        NotificationResponse updatedNotification = notificationService.markNotificationAsRead(notificationId);
        return ResponseEntity.ok(updatedNotification);
    }

    @GetMapping("/{recipientId}")
    public ResponseEntity<List<NotificationResponse>> getRecipientNotifications(@PathVariable Long recipientId) {

        List<NotificationResponse> notifications = notificationService.getRecipientNotifications(recipientId);
        return ResponseEntity.ok(notifications);
    }
}
