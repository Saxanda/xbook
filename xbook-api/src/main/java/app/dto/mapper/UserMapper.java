package app.dto.mapper;

import app.dto.request.PatchUserRequest;
import app.dto.request.UserRegistrationRequest;
import app.dto.response.UserDetailsResponse;
import app.dto.response.UserRegistrationResponse;
import app.dto.response.UserResponse;
import app.entity.User;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {
    private final ModelMapper modelMapper;

    public User userRegistrationRequestToUser(UserRegistrationRequest userRegistrationRequest) {
        return modelMapper.map(userRegistrationRequest, User.class);
    }

    public UserRegistrationResponse userToUserRegistrationResponse(User user) {
        return modelMapper.map(user, UserRegistrationResponse.class);
    }

    public UserDetailsResponse userDetailsResponse(User user) {
        return modelMapper.map(user, UserDetailsResponse.class);
    }

    public User patchUserRequestToUser(PatchUserRequest patchUserRequest){
        return modelMapper.map(patchUserRequest, User.class);
    }

    public UserResponse userToUserResponse(User user){
        return modelMapper.map(user, UserResponse.class);
    }
}
