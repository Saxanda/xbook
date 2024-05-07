package app.dto.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Data
public class UserEmailRequest {
    @NotNull
    @Email(message = "Invalid email format")
    private String email;
}
