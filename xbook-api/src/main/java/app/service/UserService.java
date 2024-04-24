package app.service;


import app.dto.request.UpdateUserRequest;
import app.entity.User;
import app.exception.ResourceNotFoundException;
import app.repository.UserRepository;
import app.security.JwtUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.context.SecurityContextHolder;
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
            System.out.println("Save user to database :" + user);
            return userRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("This user already exists.");
        }
    }

    public Optional<User> findById(Long id) {
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

    public boolean isEmailExisting(String email) {
        return userRepository.existsUserByEmail(email);
    }


    // Returns specific User based on a JWT token in request
    public User getAuthUser() {
        JwtUserDetails principal = (JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return principal.getUser();
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

    public User updateUser(Long id, UpdateUserRequest request) {

        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            //Update the user fields
            User user = optionalUser.get();
            user.setName(request.getName()); // user name update
            user.setSurname(request.getSurname()); // user surname update
            user.setEmail(request.getEmail()); // user email update

            return userRepository.save(user);
        } else {
            // Handle the case where the user with the given id does not exist
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
    }

    public List<User> searchUsersByName(String name) {
        return userRepository.findByNameContaining(name);
    }

    public User updateUser(Long id, UpdateUserRequest request) {

        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            //Update the user fields
            User user = optionalUser.get();
            user.setName(request.getName()); // user name update
            user.setSurname(request.getSurname()); // user surname update
            user.setEmail(request.getEmail()); // user email update

            return userRepository.save(user);
        } else {
            // Handle the case where the user with the given id does not exist
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
    }

    public List<User> searchUsersByName(String name) {
        return userRepository.findByNameContaining(name);
    }
}
