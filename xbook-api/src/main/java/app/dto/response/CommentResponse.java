package app.dto.response;

import lombok.Data;

@Data
public class CommentResponse {
    private Long id;
    private String content;
    private Long userId;
    private Long postId;
}
