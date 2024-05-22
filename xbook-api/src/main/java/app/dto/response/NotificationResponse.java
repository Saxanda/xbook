package app.dto.response;

import app.entity.NotificationType;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class NotificationResponse {
    private Long id;
    private Long postId;
    private NotificationType notificationType;
    private String message;
    private LocalDateTime timestamp;
    private UserDetailsResponse sender;
    private UserDetailsResponse recipient; // User's name to whom the notification is targeted
    private boolean readStatus;
}
