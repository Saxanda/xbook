package app.dto.request;

import lombok.Data;

@Data
public class BookmarkRequest {
    private Long userId;
    private Long postId;
}