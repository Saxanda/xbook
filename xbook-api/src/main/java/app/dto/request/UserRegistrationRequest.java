package app.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationRequest {
    @NotBlank(message = "The name cannot be blank")
    @Size(min = 2, message = "The name must consist of at least 2 characters")
    private String name;
    @NotBlank(message = "The name cannot be blank")
    @Size(min = 2, message = "The name must consist of at least 2 characters")
    private String surname;
    @Email(message = "Invalid email format")
    private String email;
    @Pattern(regexp = "(?=.*[a-z])(?=.*[A-Z]).{6,}", message = "The password must be at least 6 characters long " +
            "and contain at least 1 uppercase and 1 lowercase letter")
    private String password;
    @Past(message = "Date of birth must be in the past")
    @NotNull
    private LocalDate dob;
}
