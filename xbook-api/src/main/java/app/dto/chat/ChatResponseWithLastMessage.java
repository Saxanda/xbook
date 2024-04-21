package app.dto.chat;

import app.dto.message.LastMessageInChat;
import lombok.Data;

@Data
public class ChatResponseWithLastMessage {
    private Long id;
    private UserInChatRepresentation chatParticipant;
    private LastMessageInChat lastMessage;
}
