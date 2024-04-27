package app.dto.request;

import app.entity.PostType;
import lombok.Data;

@Data
public class PostRequest {
    private String title;
    private String body;
    private String media;
    private PostType type;
}
