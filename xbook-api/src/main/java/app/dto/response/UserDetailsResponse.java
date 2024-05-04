package app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class UserDetailsResponse {
    private Long id;
    private String name;
    private String surname;
    private String email;
    private String address;
    private String avatar;
    private String dob; //date of birth
}
