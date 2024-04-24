package app.dto.chat;

import lombok.Data;

@Data
public class ChatResponse {
    private Long id;
    private UserInChatRepresentation chatParticipant;
}
