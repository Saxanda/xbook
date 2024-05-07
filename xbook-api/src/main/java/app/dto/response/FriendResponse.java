package app.dto.response;

import app.entity.FriendshipStatus;
import lombok.Data;

@Data
public class FriendResponse {
    private Long id;
    private Long userId;
    private Long friendId;
    private FriendshipStatus status;
}
