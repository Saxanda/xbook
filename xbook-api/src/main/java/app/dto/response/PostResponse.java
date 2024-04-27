package app.dto.response;

import lombok.AllArgsConstructor;
import app.entity.PostType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostResponse {
    private Long id;
    private String title;
    private String body;
    private String media;
    private int likes;
    private Long postID;
    private PostType type;
}
