package app.controller;

import app.dto.response.NotificationResponse;
import app.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationService notificationService;


    @PutMapping("/{notificationId}/read")
    public ResponseEntity<NotificationResponse> markNotificationAsRead(@PathVariable Long notificationId) {
        NotificationResponse updatedNotification = notificationService.markNotificationAsRead(notificationId);
        return ResponseEntity.ok(updatedNotification);
    }

    @GetMapping("/{recipientId}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<?> getRecipientNotifications(@PathVariable Long recipientId,
                                                       @RequestParam(defaultValue = "0") Integer page,
                                                       @RequestParam(defaultValue = "5") Integer size) {
        Page<NotificationResponse> notifications = notificationService.getPageRecipientNotifications(recipientId, page, size);

        if (!notifications.hasContent()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "There are no notifications for this recipient.");
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.ok(notifications);
    }
}
