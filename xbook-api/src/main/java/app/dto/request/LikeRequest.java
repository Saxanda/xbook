package app.dto.request;

import lombok.Data;

@Data
public class LikeRequest {
    private Long userId;
    private Long postId;
}
