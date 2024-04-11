package app.controller;

import app.dto.request.LoginRequest;
import app.dto.request.LoginResponse;
import app.entity.User;
import app.dto.request.UserRegistrationRequest;
import app.repository.UserRepository;
import app.service.JwtTokenService;
import app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserRepository dbUserRepository;
    private final PasswordEncoder encoder;
    private final JwtTokenService tokenService;

    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return userService.findByUsername(username);
    }

    @GetMapping("/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userService.findByEmail(email);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@Valid @RequestBody UserRegistrationRequest request) {
        // Logic for user registration
        userService.registerUser(request);

        return ResponseEntity.ok("User registered successfully");
    }

    // Should send in response a generated token
    // if email and password is correct
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> handleLogin(@RequestBody LoginRequest rq) {
        System.out.println(dbUserRepository.findDbUserByEmail(rq.getEmail()));

        return dbUserRepository.findDbUserByEmail(rq.getEmail())
                .filter(user -> encoder.matches(rq.getPassword(), user.getPassword()))
                .map(user -> tokenService.generateToken(user.getId()))
                .map(LoginResponse::Ok)
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity
                                .status(HttpStatus.valueOf(403))
                                .body(LoginResponse.Error("wrong email/password combination"))
                );
    }

    @GetMapping("hello")
    public ResponseEntity<?> hello() {
        return ResponseEntity.ok().body("Hello world!");
    }
    @GetMapping("/calculator/{x}/{y}")
    public ResponseEntity<?> calculate(@PathVariable("x") long x, @PathVariable("y") long y) {
        Long result = x + y;
        return ResponseEntity.ok(result);
    }

}
