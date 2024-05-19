package app.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentResponse {
    private Long id;
    private String content;
    private LocalDateTime localDateTime;
    private UserDetailsResponse author; // User's id which created comment under the post
    private Long postId;
}
