package app.controller;

import app.dto.mapper.UserMapper;
import app.dto.request.LoginRequest;
import app.dto.request.UserRegistrationRequest;
import app.dto.response.ErrorResponse;
import app.dto.response.LoginResponse;
import app.entity.User;
import app.security.JwtTokenService;
import app.service.EmailConfirmationService;
import app.service.UserService;
import jakarta.transaction.Transactional;
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
    private final EmailConfirmationService emailConfirmationService;

    @PostMapping("registration")
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public ResponseEntity<?> registration(@Validated @RequestBody UserRegistrationRequest userRegistrationRequest) {
        if (userService.isEmailExisting(userRegistrationRequest.getEmail())) {
            ErrorResponse errorResponse = new ErrorResponse("This email is already taken.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        } else {
            User user = userMapper.userRegistrationRequestToUser(userRegistrationRequest);
            user.setActivated(false);
            String confirmationToken = emailConfirmationService.generateConfirmationToken();
            user.setConfirmationToken(confirmationToken);
            User createdUser = userService.createUser(user);

            // Trigger email confirmation process using EmailConfirmationService class
            emailConfirmationService.sendConfirmationEmail(createdUser.getEmail(), confirmationToken);
            return ResponseEntity.status(HttpStatus.CREATED).body(userMapper.userToUserRegistrationResponse(createdUser));
        }
    }

    @PostMapping("login")
    public ResponseEntity<LoginResponse> handleLogin(@RequestBody LoginRequest rq) {
        return userService.findByEmail(rq.getEmail()).filter(user -> encoder.matches(rq.getPassword(), user.getPassword()))
                .map(user -> tokenService.generateToken(Math.toIntExact(user.getId())))
                .map(LoginResponse::ok).map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(LoginResponse.error("wrong email/password combination")));
    }

}
