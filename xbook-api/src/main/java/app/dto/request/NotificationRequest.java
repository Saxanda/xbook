package app.dto.request;

import lombok.Data;

@Data
public class NotificationRequest {
    private String message;
    private Long senderId;
    private Long recipientId; // User ID to whom the notification is targeted
}
