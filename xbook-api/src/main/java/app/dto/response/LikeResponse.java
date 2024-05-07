package app.dto.response;

import app.entity.Post;
import app.entity.User;
import lombok.Data;

@Data
public class LikeResponse {
    private Long id;
    private User user;
    private Post post;
}