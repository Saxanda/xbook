package app.dto.request;

import lombok.Data;

@Data
public class CommentRequest {
    private String content;
    private Long userID;
    private Long postID;
}