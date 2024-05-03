package app.dto.response;

import lombok.Data;

@Data
public class UserResponse {
    private Long id;
    private String name;
    private String surname;
    private String email;
    private String address;
    private String avatar;
    private String dob; //date of birth
}
