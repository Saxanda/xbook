package app.controller;

import app.dto.mapper.UserMapper;
import app.dto.request.UpdateUserRequest;
import app.dto.response.UserDetailsResponse;
import app.dto.response.UserRegistrationResponse;
import app.entity.User;
import app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    // Retrieve all users
    @GetMapping("all")
    @ResponseStatus(HttpStatus.OK)
    public List<UserDetailsResponse> getAll() {
        return userService.getAllUsers().stream()
                .map(userMapper::userDetailsResponse)
                .collect(Collectors.toList());
    }
    // Get a single user by ID
    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<UserDetailsResponse> getUserById(@PathVariable Long id) {
        return userService.findById(id)
                .map(userMapper::userDetailsResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    // Update user details by ID
    @PutMapping("/{id}")
    public ResponseEntity<UserDetailsResponse> updateUserById(@PathVariable Long id, @Validated @RequestBody UpdateUserRequest request) {
        User updatedUser = userService.updateUser(id, request);
        if (updatedUser == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userMapper.userDetailsResponse(updatedUser));
    }
    // Search users by name or surname
    @GetMapping("/search")
    @ResponseStatus(HttpStatus.OK)
    public List<UserDetailsResponse> searchUsers(@RequestParam(required = false) String name) {
        return userService.searchUsersByName(name).stream()
                .map(userMapper::userDetailsResponse)
                .collect(Collectors.toList());
    }
}
