package app.controller;

import app.dto.mapper.UserMapper;
import app.dto.request.PatchUserRequest;
import app.dto.request.UpdateUserRequest;
import app.dto.response.UserDetailsResponse;
import app.dto.response.UserResponse;
import app.entity.FriendshipStatus;
import app.entity.User;
import app.service.FriendService;
import app.service.UserService;
import app.utils.ControllerUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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
public class UserController {
    private final UserService userService;

    private final FriendService friendService;
    private final UserMapper userMapper;

    @GetMapping("{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable("id") Long id) {
        User user = userService.findById(id).get();
        UserResponse userResponse = userMapper.userToUserResponse(user);

        Long userId = userService.getCurrentUserId();
        FriendshipStatus friendshipStatus = friendService.getFriendshipStatus(userId, id);
        userResponse.setStatus(friendshipStatus);

        return ResponseEntity.ok(userResponse);
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
    public List<UserDetailsResponse> searchUsersByInput(@RequestParam(required = false) String input) {
        return userService.searchUsersByInput(input).stream()
                .map(userMapper::userDetailsResponse)
                .collect(Collectors.toList());
    }

    @PatchMapping("{id}")
    public ResponseEntity patchUserById(@PathVariable("id") Long id, @Validated @RequestBody PatchUserRequest request, BindingResult bindingResult) {
        if (ControllerUtils.handleValidationErrors(bindingResult) != null) {
            return ControllerUtils.handleValidationErrors(bindingResult);
        } else {
            User user = userMapper.patchUserRequestToUser(request);
            User patchedUser = userService.patchUserById(id, user);
            UserDetailsResponse userResponse = userMapper.userDetailsResponse(patchedUser);
            return ResponseEntity.ok(userResponse);
        }
    }

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.OK)
    public Page<UserDetailsResponse> getAll(@RequestParam(defaultValue = "0") Integer page,
                                            @RequestParam(defaultValue = "5") Integer size) {
        return userService.getAllUsersPage(page, size).map(userMapper::userDetailsResponse);
    }

}
