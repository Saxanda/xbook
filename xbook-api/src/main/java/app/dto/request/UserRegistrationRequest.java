package app.dto.request;

import app.validator.UniqueEmail;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
public class UserRegistrationRequest {
    @NotBlank(message = "The name cannot be blank")
    @Size(min = 2, message = "The name must consist of at least 2 characters")
    private String name;
    @NotBlank(message = "The name cannot be blank")
    @Size(min = 2, message = "The name must consist of at least 2 characters")
    private String surname;
    @NotBlank(message = "The email name cannot be blank.")
    @Email(message = "Invalid email format")
    @UniqueEmail
    private String email;
    @Pattern(regexp = "(?=.*[a-z])(?=.*[A-Z]).{6,}", message = "The password must be at least 6 characters long " +
            "and contain at least 1 uppercase and 1 lowercase letter")
    private String password;
    @Past(message = "Date of birth must be in the past")
    @NotNull
    private LocalDate dob;
    @NotEmpty
    private String gender;
}
