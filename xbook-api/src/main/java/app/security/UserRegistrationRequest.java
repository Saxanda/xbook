package app.security;


import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;


@Data
public class UserRegistrationRequest {

    @NotEmpty(message = "Username is required")
    private String username;

    @NotEmpty(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotEmpty(message = "Password is required")
    @PasswordValidator(message = "Invalid password")
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    // Getters and setters
}
