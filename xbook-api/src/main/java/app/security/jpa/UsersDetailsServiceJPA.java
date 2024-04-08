package app.security.jpa;

import app.security.jpa.User;
import app.security.jpa.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Configuration
@RequiredArgsConstructor
public class UsersDetailsServiceJPA implements UserDetailsService {

  private final UserRepository repo;

  private UserDetails remapper(User u) {
    return org.springframework.security.core.userdetails.User
      .withUsername(u.getUsername())
      .password(u.getPassword())
      .roles(u.getRoles())
      .build();
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    return repo.findDbUserByUsername(username)
      .map(this::remapper)
      .orElseThrow(() -> new UsernameNotFoundException(
        String.format("user %s not found", username)
      ));
  }

}
