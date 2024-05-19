package app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailsResponse {
    private Long id;
    private String name;
    private String surname;
    private String email;
    private String address;
    private String photo;
    private String avatar;
    private LocalDate dob; //date of birth
    private String gender;
}
