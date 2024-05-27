package app.service;

import app.dto.response.NotificationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WebSocketService {
    private final SimpMessagingTemplate messagingTemplate;

    public void sendNotificationResponseToUser(Long userId, NotificationResponse notificationResponse) {
        messagingTemplate.convertAndSendToUser(userId.toString(), "/topic/private-notifications", notificationResponse);
    }
}
