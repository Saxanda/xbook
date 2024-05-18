package app.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.validation.constraints.NotNull;

@Data
//@AllArgsConstructor
//@NoArgsConstructor
public class CommentRequest {
    @NotNull()
    private String content;
    @NotNull()
    private Long userId;
    @NotNull()
    private Long postId;
}