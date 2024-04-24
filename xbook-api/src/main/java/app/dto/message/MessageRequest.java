package app.dto.message;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageRequest {
    @NotNull()
    private Long chatId;
    @NotNull()
    private String contentType;
    @NotNull()
    private String content;
}
