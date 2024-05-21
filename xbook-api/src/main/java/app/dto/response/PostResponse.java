package app.dto.response;

import app.entity.PostType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostResponse {
    private Long id;
    private UserDetailsResponse author; // User's Id
    private LocalDateTime timestamp;
    private String title;
    private String body;
    private String media;
    private PostResponse originalPost; // Post's id
    private PostType type;
    private int likesCount;
    private boolean isLiked;
    private int commentsCount;
    private int repostsCount;
    private boolean isBookmarked;

}