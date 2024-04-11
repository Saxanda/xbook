package app.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {
    private boolean status;
    private String error;
    private String token;
    public static LoginResponse Ok(String token) {
        return new LoginResponse(true, null, token);
    }
    public static LoginResponse Error(String msg) {
        return new LoginResponse(false, msg, null);
    }
}
