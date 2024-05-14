package app.dto.response;

import lombok.Data;

@Data
public class BookmarkResponse {
    private Long bookmarkId;
    private Long userId;
    private Long postId;
}
