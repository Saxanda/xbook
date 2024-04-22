package app.controller;

import app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ConfirmationController {

    private final UserService userService;

    @Autowired
    public ConfirmationController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/confirm-email")
    public ResponseEntity<String> confirmEmail(@RequestParam("token") String confirmationToken) {
        try {
            boolean isConfirmed = userService.processEmailConfirmation(confirmationToken).isActivated();
            if (isConfirmed) {

                return ResponseEntity.status(HttpStatus.FOUND).
                        header("Location", "http://localhost:5173/login").build();
            } else {
                return ResponseEntity.badRequest().body("Invalid or expired confirmation token.");
            }
        } catch (Exception e) {
            // For more exceptions
            return ResponseEntity.internalServerError().body("An error occurred during email confirmation.");
        }
    }
}

