package app.controller;

import app.dto.message.MessageRequest;
import app.dto.message.MessageResponse;
import app.dto.message.UpdateMessageRequest;
import app.entity.User;
import app.service.ChatService;
import app.service.MessageService;
import app.service.UserService;
import app.service.WebSocketService;
import app.utils.MessageStatus;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.security.Principal;

@Log4j2
@Controller
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;
    private final ChatService chatService;
    private final UserService userService;
    private final WebSocketService webSocketService;

    @MessageMapping("/chat")
    @Transactional
    public void sendMessage(@Payload MessageRequest msgRq, SimpMessageHeaderAccessor headerAccessor) {
        Principal sender = headerAccessor.getUser();

        System.out.printf("\nSender of a message: %s", sender.getName());
        System.out.printf("\nChatId: %s, contentType: %s, content: %s, ", msgRq.getChatId(), msgRq.getContentType(), msgRq.getContent());

        User authUser = userService.getAuthUser(sender);
        System.out.printf("Auth user (sender): %s", authUser);

        User receiver = chatService.getChatParticipant(msgRq.getChatId(), authUser);
        System.out.printf("\nReceiver of a message: %s", receiver);

        MessageResponse messageResponse = messageService.createNewMessage(msgRq, authUser);

        try {
            Long unreadMessage = messageService.countUnreadMessages(receiver, msgRq.getChatId());
            webSocketService.sendNewMessage(receiver, messageResponse);
            webSocketService.sendMessageNotification(receiver, unreadMessage);
        } catch (Exception ex) {
            MessageResponse res = messageService.updateStatus(messageResponse.getId(), MessageStatus.FAILED, authUser);
            webSocketService.sendNewMessage(sender, res);
            log.error("Failed to send message " + ex);
        }
        webSocketService.sendNewMessage(sender, messageResponse);
    }

    @MessageMapping("/update-message-status/{id}")
    @Transactional
    public void updateMessageStatus(@DestinationVariable("id") Long messageId, String newStatus, SimpMessageHeaderAccessor headerAccessor) {
        System.out.printf("MessageId: %s", messageId);
        System.out.printf("NewStatus: %s", newStatus);
        Principal sender = headerAccessor.getUser();
        System.out.printf("\nSender of a message in updateMessageStatus function: %s", sender.getName());
        User authUser = userService.getAuthUser(sender);

        MessageResponse messageResponse = messageService.updateStatus(messageId, MessageStatus.valueOf(newStatus), authUser);
        System.out.println("Message Response:");
        System.out.println(messageResponse);
        User receiver = chatService.getChatParticipant(messageResponse.getChat().getId(), authUser);

        webSocketService.updateMessageStatus(receiver, messageResponse);

        Long unreadMessage = messageService.countUnreadMessages(authUser, messageResponse.getChat().getId());
        log.info("User " + authUser.getEmail() + "has " + unreadMessage + " unread messages!");
        webSocketService.sendMessageNotification(authUser, unreadMessage);
    }

    @DeleteMapping("/api/v1/messages/delete/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable("id") Long messageId) {
        if (messageService.deleteMessageById(messageId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The message with id " + messageId + " doesn`t exist!");
    }

    @PostMapping("/api/v1/messages/update/{id}")
    public ResponseEntity<MessageResponse> editMessage(@PathVariable("id") Long messageId, @RequestBody UpdateMessageRequest newContent) {
        MessageResponse messageResponse = messageService.editMessage(messageId, newContent);
        return ResponseEntity.ok().body(messageResponse);
    }
}