package app.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequest {
   @NotBlank(message = "The name cannot be blank")
   @Size(min = 2, message = "The name must consist of at least 2 characters")
   private String name;
   @NotBlank(message = "The name cannot be blank")
   @Size(min = 2, message = "The name must consist of at least 2 characters")
   private String surname;
   @NotBlank(message = "The email cannot be blank")
   @Email(message = "Invalid email format")
   private String email;
   @NotNull(message = "The birth date cannot be blank.")
   @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
   @Past(message = "The birth date must be earlier than the current date.")
   private LocalDate dob;
   @NotBlank(message = "The gender cannot be blank")
   private String gender;
   private String photo;
   private String avatar;
   private String address;
}
