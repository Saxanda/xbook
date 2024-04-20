package app.service;


import app.dto.request.UpdateUserRequest;
import app.entity.User;
import app.exception.ResourceNotFoundException;
import app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    private final PasswordEncoder encoder;

    public User createUser(User user) throws DataIntegrityViolationException {
        try {
            user.setPassword(encoder.encode(user.getPassword()));
            user.setRole("USER");
            System.out.println("Save user to database :" +user);
            return userRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("This user already exists.");
        }
    }

    public Optional<User> findById(Integer id) {
        return Optional.ofNullable(userRepository.findUserById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found User with id = " + id)));
    }

    public Optional<User> findByEmail(String email) {
        return Optional.ofNullable(userRepository.findUserByEmail(email))
                .orElseThrow(() -> new ResourceNotFoundException("Not found User with email = " + email));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public boolean isEmailExisting(String email){
        return userRepository.existsUserByEmail(email);
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }
    public User findByConfirmationToken(String confirmationToken) {

        return userRepository.findByConfirmationToken(confirmationToken);
    }
    public User processEmailConfirmation(String confirmationToken) {
        User user = findByConfirmationToken(confirmationToken);
        if (user != null) {
            // Mark the email as confirmed
            user.setConfirmationToken(null);
            // Update confirmation status
            user.setActivated(true);
            saveUser(user);
        }
        return user;
    }

    public User updateUser(Integer id, UpdateUserRequest request) {
        return null;
    }
}
