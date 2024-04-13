package app.controller;

import app.entity.User;
import app.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ConfirmationController {

    private UserService userService;

    public ConfirmationController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/confirm/{token}")
    public ResponseEntity<String> confirmEmail(@PathVariable("token") String confirmationToken) {
        // Validate the confirmation token and process confirmation
        User user = userService.processEmailConfirmation(confirmationToken);
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid confirmation token");
        }

        // Providing feedback to the user
        return ResponseEntity.ok("Email confirmed successfully");
    }
}

