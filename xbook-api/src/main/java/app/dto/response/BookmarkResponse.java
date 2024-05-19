package app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookmarkResponse {
    private Long postId;
    private UserDetailsResponse author;
    private String body;
    private String media;
    private LocalDateTime timestamp;
    private PostResponse originalPost;
    private int likesCount;
    private int commentsCount; //optional
    private int repostsCount; //optional
    private boolean isLiked;
    private boolean isBookmarked;
}
