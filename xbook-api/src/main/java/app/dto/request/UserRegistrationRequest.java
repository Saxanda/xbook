package app.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
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
    @NotEmpty
    private String gender;
}
