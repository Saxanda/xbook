package app.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateUserPasswordRequest {
    @NotNull
    private String email;
    @NotNull
    private String newPassword;
}
