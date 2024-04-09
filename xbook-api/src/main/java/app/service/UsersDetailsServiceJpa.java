package app.service;

import app.repository.UserRepository;
import app.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Configuration
@RequiredArgsConstructor
public class UsersDetailsServiceJpa implements UserDetailsService {

    private final UserRepository repo;

    private UserDetails remapper(User user) {
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .roles(user.getRoles())
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
