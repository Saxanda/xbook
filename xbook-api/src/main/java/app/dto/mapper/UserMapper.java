package app.dto.user;

import app.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.modelmapper.ModelMapper;

@Component
@RequiredArgsConstructor
public class UserMapper {
  private final ModelMapper modelMapper;

  public User userRegistrationRequestToUser(UserRegistrationRequest userRegistrationRequest){
    return modelMapper.map(userRegistrationRequest, User.class);
  }

}
