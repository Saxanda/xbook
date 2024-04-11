package app.service;


import app.dto.request.UserRegistrationRequest;
import app.repository.UserRepository;
import app.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void registerUser(UserRegistrationRequest request) {
        // 1. Validate user input
        if (!isValidRegistrationRequest(request)) {
            throw new IllegalArgumentException("Invalid registration request");
        }

        // 2. Check if the user already exists
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }

        // 3. Create a new user entity
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());

        // 4. Encode the password for future needs
        //String encodedPassword = passwordEncoder.encode(request.getPassword());
        //user.setPassword(encodedPassword);

        // 5. Save the user entity to the database
        userRepository.save(user);

    }

    private boolean isValidRegistrationRequest(UserRegistrationRequest request) {
        return false;
    }


    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User getUserByConfirmationToken(String confirmationToken) {
        return userRepository.findByConfirmationToken(confirmationToken);
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }
}
