package app.dto.response;

import lombok.Data;

@Data
public class UserDetailsResponse {
    private Long id;
    private String name;
    private String surname;
    private String email;
    private String address;
    private String photo;
    private String avatar;
    private String dob; //date of birth
    private String gender;
}
