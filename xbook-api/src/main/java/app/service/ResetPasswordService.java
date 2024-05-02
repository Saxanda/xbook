package app.service;

import app.configuration.cache.CacheStore;
import app.entity.User;
import app.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ResetPasswordService {
    private final UserService userService;
    private final CacheStore<String> resetPasswordTokenCache;
    private final EmailConfirmationService emailConfirmationService;
    private String generateToken() {
        return UUID.randomUUID().toString();
    }

    private String generateAndAddTokenToCache(String email){
        String token = generateToken();
        resetPasswordTokenCache.add(email, token);
        return token;
    }

    public void sendResetPasswordLink(String email) {
        Optional<User> user = userService.findByEmail(email);
        if (user.isEmpty()) throw new ResourceNotFoundException("User with email '" + email + "' was not found!");
        String resetPasswordToken = generateAndAddTokenToCache(email);
        String letterContent = "Click the following link to reset your password: " +
                               "http://localhost:8080/forgot-password?token=" +
                               resetPasswordToken +
                               " This link will be invalid in 10 minutes!";

        emailConfirmationService.sendEmail(email, "Reset Password in Xbook", letterContent);
    }

    public void resetUserPassword(String token, String email, String newPassword) {
        if (!isResetPasswordTokenValid(token, email)) throw new RuntimeException("Token isn`t valid!");
        userService.updatePassword(email, newPassword);
        resetPasswordTokenCache.remove(email);
    }

    public boolean isResetPasswordTokenValid(String token, String email) {
        String tokenFromCache = resetPasswordTokenCache.get(email);
        if (tokenFromCache == null) throw new ResourceNotFoundException("Token doesn`t exist!");
        return tokenFromCache.equals(token);
    }
}
