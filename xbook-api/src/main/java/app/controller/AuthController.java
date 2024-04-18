package app.controller;

import app.dto.mapper.UserMapper;
import app.dto.request.LoginRequest;
import app.dto.request.UserRegistrationRequest;
import app.dto.response.ErrorResponse;
import app.dto.response.LoginResponse;
import app.dto.response.UserRegistrationResponse;
import app.entity.User;
import app.security.JwtTokenService;
import app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserService userService;
    private final UserMapper userMapper;
    private final PasswordEncoder encoder;
    private final JwtTokenService tokenService;

    @PostMapping("registration")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> registration(@Validated @RequestBody UserRegistrationRequest userRegistrationRequest) {
        if (userService.isEmailExisting(userRegistrationRequest.getEmail())) {
            ErrorResponse errorResponse = new ErrorResponse("This email is already taken.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        } else {
            User user = userMapper.userRegistrationRequestToUser(userRegistrationRequest);
            User createdUser = userService.createUser(user);
            UserRegistrationResponse userRegistrationResponse = userMapper.userToUserRegistrationResponse(createdUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(userRegistrationResponse);
        }
    }

    @PostMapping("login")
    public ResponseEntity<LoginResponse> handleLogin(@RequestBody LoginRequest rq) {
        return userService.findByEmail(rq.getEmail()).filter(user -> encoder.matches(rq.getPassword(), user.getPassword()))
                .map(user -> tokenService.generateToken(Math.toIntExact(user.getId())))
                .map(LoginResponse::ok).map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.valueOf(401))
                        .body(LoginResponse.error("wrong email/password combination")));
    }

}