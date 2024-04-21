package app.dto.message;

import app.dto.chat.ChatResponse;
import app.dto.chat.UserInChatRepresentation;
import app.utils.ContentType;
import app.utils.MessageStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MessageResponse {
    private Long id;
    private LocalDateTime createdDate;
    private ContentType contentType;
    private String content;
    private UserInChatRepresentation sender;
    private ChatResponse chat;
    private MessageStatus status;
}
