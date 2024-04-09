package app.dto.request;


import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;


@Data
public class UserRegistrationRequest {

    @NotEmpty(message = "Username is required")
    private String username;

    @NotEmpty(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;
// FOR FUTURE NEEDS TO USE A PASSWORD VALIDATOR CLASS PasswordValidator
//    @NotEmpty(message = "Password is required")
//    @PasswordValidator(message = "Invalid password")
//    @Size(min = 8, message = "Password must be at least 8 characters")
//    private String password;

    @Pattern(regexp = "(?=.*[a-z])(?=.*[A-Z]).{8,}", message = "The password must be at least 8 characters long " +
        "and contain at least 1 uppercase and 1 lowercase letter")
    private String password;
    // Getters and setters
}
