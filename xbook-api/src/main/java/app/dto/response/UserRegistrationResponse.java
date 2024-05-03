package app.dto.response;

import lombok.Data;

@Data
public class UserRegistrationResponse {
    private String name;
    private String surname;
    private String email;

}
