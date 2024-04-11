package app.service;


import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class UserConfirmationService {

    // Map to store confirmation tokens temporarily (replace with a database or cache in production)
    private Map<String, String> confirmationTokens = new HashMap<>();

    public String generateConfirmationToken(String userId) {
        String token = UUID.randomUUID().toString();
        confirmationTokens.put(token, userId);
        return token;
    }

    public boolean confirmUser(String token) {
        String userId = confirmationTokens.get(token);
        if (userId != null) {
            // Mark user as confirmed in your user repository
            // Example: userRepository.markUserAsConfirmed(userId);
            confirmationTokens.remove(token); // Remove token after confirmation
            return true;
        }
        return false;
    }
}
