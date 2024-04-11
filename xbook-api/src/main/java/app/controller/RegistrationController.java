package app.controller;
import app.dto.request.UserRegistrationRequest;
import app.entity.User;
import app.service.EmailService;

import app.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.UUID;

@RestController
public class RegistrationController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegistrationRequest registrationRequest) {
        // Validate registration request

        // Generate confirmation token
        String confirmationToken = generateConfirmationToken();

        // Save user to database without confirmation_email column
        User user = new User();
        user.setUsername(registrationRequest.getUsername());
        user.setEmail(registrationRequest.getEmail());
        // Set other user details

        // Save user to database
        userService.saveUser(user);

        // Send confirmation email
        sendConfirmationEmail(user.getEmail(), confirmationToken);

        return ResponseEntity.ok("User registered successfully. Please check your email for confirmation.");
    }

    @GetMapping("/confirm-email")
    public ResponseEntity<String> confirmEmail(@RequestParam("token") String token) {
        // Verify confirmation token
        User user = userService.getUserByConfirmationToken(token);
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid confirmation token.");
        }

        // Mark user's email as confirmed
        user.setEmailConfirmed(true);
        userService.saveUser(user);

        return ResponseEntity.ok("Email confirmed successfully.");
    }

    // Method to generate confirmation token
    private String generateConfirmationToken() {
        // Generate unique token (e.g., using UUID.randomUUID())
        return UUID.randomUUID().toString();
    }

    // Method to send confirmation email
    private void sendConfirmationEmail(String email, String confirmationToken) {
        // Send email containing confirmation link with token
        // Example: "https://example.com/confirm-email?token=xyz123"
    }
}