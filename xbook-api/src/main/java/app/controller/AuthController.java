package app.controller;

import app.dto.mapper.UserMapper;
import app.dto.request.LoginRequest;
import app.dto.request.UpdateUserPasswordRequest;
import app.dto.request.UserEmailRequest;
import app.dto.request.UserRegistrationRequest;
import app.dto.response.LoginResponse;
import app.entity.User;
import app.security.JwtTokenService;
import app.service.EmailConfirmationService;
import app.service.ResetPasswordService;
import app.service.UserService;
import app.utils.ControllerUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    private final ResetPasswordService resetPasswordService;
    @Value("${backend.url}")
    private String backendUrl;

    @PostMapping("registration")
    @ResponseStatus(HttpStatus.CREATED)
    @Transactional
    public ResponseEntity<?> registration(@Validated @RequestBody UserRegistrationRequest userRegistrationRequest, BindingResult bindingResult) {
        if (ControllerUtils.handleValidationErrors(bindingResult) != null) {
            return ControllerUtils.handleValidationErrors(bindingResult);
        } else {
            User user = userMapper.userRegistrationRequestToUser(userRegistrationRequest);
            user.setActivated(false);
            String confirmationToken = emailConfirmationService.generateConfirmationToken();
            user.setConfirmationToken(confirmationToken);
            User createdUser = userService.createUser(user);

            // Trigger email confirmation process using EmailConfirmationService class
            String letterContent = "Click the following link to confirm your email: " +
                                  backendUrl + "/confirm-email?token=" +
                                  confirmationToken;
            emailConfirmationService.sendEmail(createdUser.getEmail(), "Email Confirmation Required", letterContent);
            return ResponseEntity.status(HttpStatus.CREATED).body(userMapper.userToUserRegistrationResponse(createdUser));
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

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody UserEmailRequest emailRq) {
        resetPasswordService.sendResetPasswordLink(emailRq.getEmail());
        return ResponseEntity.ok("Reset password link sent successfully!");
    }

    @PutMapping("/update-password/{token}")
    public ResponseEntity<String> updatePassword(@PathVariable("token") String token,
                                                 @RequestBody UpdateUserPasswordRequest updateUserPasswordRequest) {
        resetPasswordService.resetUserPassword(token, updateUserPasswordRequest.getEmail(), updateUserPasswordRequest.getNewPassword());
        return ResponseEntity.ok("Password reset successfully!");
    }


}
