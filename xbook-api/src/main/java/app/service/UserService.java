package app.service;

import app.dto.request.UpdateUserRequest;
import app.dto.response.UserDetailsResponse;
import app.entity.User;
import app.exception.ResourceNotFoundException;
import app.repository.UserRepository;
import app.security.JwtUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    public boolean isEmailExisting(String email) {
        return userRepository.existsUserByEmail(email);
    }

    // Returns specific User based on a JWT token in request
    public User getAuthUser() {
        JwtUserDetails principal = (JwtUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return principal.getUser();
    }


    public Long getAuthCurrentUserId() {
        return getAuthUser().getId();
    }

    public Long getCurrentUserId() {

        return getAuthUser().getId();
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

    public List<User> searchUsersByInput(String input) {
        return userRepository.searchUsersByInput(input);
    }


    public void updatePassword(String email, String newPassword) {
        userRepository.findUserByEmail(email).ifPresentOrElse(user -> {
            user.setPassword(encoder.encode(newPassword));
            userRepository.save(user);
        }, () -> {
            throw new ResourceNotFoundException("User not found with email: " + email);
        });
    }

    public User patchUserById(Long id, User patch) {
        Optional<User> optionalUser = findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            if (patch.getName() != null && !patch.getName().isEmpty() && !patch.getName().equals(user.getName())) {
                user.setName(patch.getName());
            }

            if (patch.getSurname() != null && !patch.getSurname().isEmpty() && !patch.getSurname().equals(user.getSurname())) {
                user.setSurname(patch.getSurname());
            }

            if (patch.getDob() != null && !patch.getDob().equals(user.getDob())) {
                user.setDob(patch.getDob());
            }

            if (patch.getGender() != null && !patch.getGender().isEmpty() && !patch.getGender().equals(user.getGender())) {
                user.setGender(patch.getGender());
            }

            if (patch.getPhoto() != null && !patch.getPhoto().isEmpty() && !patch.getPhoto().equals(user.getPhoto())) {
                user.setPhoto(patch.getPhoto());
            }

            if (patch.getAvatar() != null && !patch.getAvatar().isEmpty() && !patch.getAvatar().equals(user.getAvatar())) {
                user.setAvatar(patch.getAvatar());
            }

            if (patch.getAddress() != null && !patch.getAddress().isEmpty() && !patch.getAddress().equals(user.getAddress())) {
                user.setAddress(patch.getAddress());
            }

            return userRepository.save(user);
        } else {
            throw new ResourceNotFoundException("User not found with id: " + id);
        }
    }

    public Page<User> getAllUsersPage(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(pageable);
    }

    public UserDetailsResponse getUserDetails(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return new UserDetailsResponse(
                user.getId(),
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                user.getAddress(),
                user.getPhoto(),
                user.getAvatar(),
                user.getDob(),
                user.getGender()
        );
    }
}
