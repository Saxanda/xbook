package app.dto.request;

import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDate;

@Data
public class PatchUserRequest {
    private String name;
    private String surname;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    @Past(message = "The birth date must be earlier than the current date.")
    private LocalDate dob;
    private String gender;
    private String photo;
    private String avatar;
    private String address;
}
