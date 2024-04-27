package app.dto.chat;

import lombok.Data;

@Data
public class UserInChatRepresentation {
    private String name;
    private String surname;
    private String email;
    private String avatar;
}
