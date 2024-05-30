package app.service;

import app.dto.response.NotificationResponse;
import app.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Log4j2
@Service
@RequiredArgsConstructor
public class WebSocketService {
    private final SimpMessagingTemplate messagingTemplate;

    public void sendNotificationResponseToUser(Long userId, NotificationResponse notificationResponse) {
        System.out.printf("\nSendNotificationResponseToUser in WebSocket is WORKING to user with id " + userId);
        System.out.println("NotificationResponse:");
        System.out.println(notificationResponse);
        messagingTemplate.convertAndSendToUser(userId.toString(), "/topic/notifications", notificationResponse);
    }

    public void sendMessageNotification(User user, Object message) {
        System.out.println("Message Notification IS WORKING to user: " + user.getEmail());
        System.out.printf("Unread messages: %s \n", message);
        sendMessageToUser(user, "/queue/message-notification", message);
    }

    public void updateMessageStatus(User user, Object message) {
        System.out.println("UpdateMessageStatus IS WORKING for user: " + user.getEmail());
        sendMessageToUser(user, "/queue/message-status", message);
    }

    public void sendNewMessage(User receiver, Object message) {
        sendMessageToUser(receiver, "/queue/messages", message);
    }
    public void sendNewMessage(Principal sender, Object message) {
        sendMessageToAuthUser(sender, "/queue/messages", message);
    }
    private void sendMessageToUser(User user, String destination, Object message) {
        System.out.println("SENDMessageToUser is WORKING");
        System.out.println(user.getName());
        System.out.println(user.getId());

        try {
            messagingTemplate.convertAndSendToUser(user.getEmail(), destination, message);
        } catch (Exception ex) {
            log.error("Failed to send message to user: " + user.getEmail(), ex);
        }
    }
    private void sendMessageToAuthUser(Principal user, String destination, Object message) {
        System.out.println("SENDMessageToAuthUser is WORKING");
        System.out.println(user.getName());

        try {
            messagingTemplate.convertAndSendToUser(user.getName(), destination, message);
        } catch (Exception ex) {
            log.error("Failed to send message to authUser: " + user.getName(), ex);
        }
    }
}
