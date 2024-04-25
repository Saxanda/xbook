package app.dto.message;

import app.dto.chat.UserInChatRepresentation;
import app.utils.ContentType;
import app.utils.MessageStatus;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LastMessageInChat {
    private ContentType contentType;
    private String content;
    private UserInChatRepresentation sender;
    private LocalDateTime createdDate;
    private MessageStatus status;
}
