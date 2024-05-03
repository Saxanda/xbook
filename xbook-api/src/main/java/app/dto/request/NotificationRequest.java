package app.dto.request;

import lombok.Data;

@Data
public class NotificationRequest {
    private String message;
    private Long recipient; // User ID to whom the notification is targeted
}
