package app.controller;

import app.entity.User;
import app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ConfirmationController {

    private final UserService userService;

    @Autowired
    public ConfirmationController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/confirm-email/{token}")
    public ResponseEntity<String> confirmEmail(@PathVariable("token") String confirmationToken) {
        try {
            boolean isConfirmed = userService.processEmailConfirmation(confirmationToken).isActivated();
            if (isConfirmed) {
                //TODO Frontend needs to apply the page
                return ResponseEntity.ok("Email confirmed successfully.");
                //response.sendRedirect("https://localhost:8080/confirmation-success");
            } else {
                return ResponseEntity.badRequest().body("Invalid or expired confirmation token.");
            }
        } catch (Exception e) {
            // For more exceptions
            return ResponseEntity.internalServerError().body("An error occurred during email confirmation.");
        }
    }
}

