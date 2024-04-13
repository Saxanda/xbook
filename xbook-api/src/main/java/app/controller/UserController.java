package app.controller;

import app.dto.mapper.UserMapper;
import app.dto.response.UserRegistrationResponse;
import app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    //UserRegistrationResponse is used as an example for a response.
    @GetMapping("all")
    public List<UserRegistrationResponse> getAll() {
        return userService.getAllUsers().stream()
                .map(userMapper::userToUserRegistrationResponse)
                .collect(Collectors.toList());
    }

}
