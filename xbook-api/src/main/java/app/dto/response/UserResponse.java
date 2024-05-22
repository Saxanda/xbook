package app.dto.response;

import app.entity.FriendshipStatus;
import lombok.Data;

@Data
public class UserResponse {
    private Long id;
    private String name;
    private String surname;
    private String email;
    private String address;
    private String photo;
    private String avatar;
    private String dob; //date of birth
    private String gender;
    private FriendshipStatus status;
}
