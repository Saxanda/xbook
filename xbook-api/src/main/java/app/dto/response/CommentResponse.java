package app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponse {
    private Long id;
    private String content;
    private LocalDateTime createdDate;
    private UserDetailsResponse author; // User's id which created comment under the post
    private Long postId;
}
