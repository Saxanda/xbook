package app.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import javax.validation.constraints.Email;

@Data
public class UpdateUserPasswordRequest {
    @NotNull
    @Email(message = "Invalid email format")
    private String email;

    @NotNull
    private String newPassword;
}
