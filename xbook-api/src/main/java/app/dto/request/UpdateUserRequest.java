package app.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

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
   @Email(message = "Invalid email format")
   private String email;

}
