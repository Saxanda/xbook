package app.service;

import app.entity.Friend;
import app.entity.FriendshipStatus;
import app.entity.User;
import app.exception.ResourceNotFoundException;
import app.repository.FriendRepository;
import app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendService {
    private final FriendRepository friendRepository;
    private final UserRepository userRepository;

    public Friend createFriend(Friend friend) throws DataIntegrityViolationException {
        try {
            return friendRepository.save(friend);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("This friend already exists.");
        }
    }

    public Friend getFriend(Long userId, Long friendId) {
        return friendRepository.findByUserIdAndFriendId(userId, friendId)
                .orElseThrow(() -> new ResourceNotFoundException("This friend was not found."));
    }

    public Friend updateFriend(Friend friend) {
        friend.setStatus(FriendshipStatus.ACCEPTED);
        return friendRepository.save(friend);
    }

    public void deleteFriend(Friend friend) {
        friendRepository.delete(friend);
    }

    private User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }

    boolean existFriend(Long userId, Long friendId) {
        return friendRepository.existsByUserIdAndFriendId(userId, friendId);
    }

    public Friend sendFriendRequest(Long userId, Long friendId) {
        if (userId == friendId) {
            throw new IllegalArgumentException("User ID and friend ID must be different.");
        } else if (existFriend(userId, friendId) || existFriend(friendId, userId)) {
            throw new DataIntegrityViolationException("This friend already exists.");
        } else {
            User user = getUserById(userId);
            User friend = getUserById(friendId);
            Friend newFriend = new Friend(user, friend, FriendshipStatus.PENDING);
            return createFriend(newFriend);
        }
    }

    public Friend acceptFriendRequest(Long userId, Long friendId) {
        if (existFriend(userId, friendId)) {
            throw new DataIntegrityViolationException("This friend already exists.");
        } else {
            User user = getUserById(userId);
            User friend = getUserById(friendId);
            updateFriend(getFriend(friendId, userId));
            Friend newFriend = new Friend(user, friend, FriendshipStatus.ACCEPTED);
            return createFriend(newFriend);
        }
    }

    public void rejectFriendRequest(Long userId, Long friendId) {
        deleteFriend(getFriend(friendId, userId));
    }

    public void terminateFriendship(Long userId, Long friendId) {
        deleteFriend(getFriend(userId, friendId));
        deleteFriend(getFriend(friendId, userId));
    }

    public List<User> getAllFriends(Long userId) {
        return userRepository.findFriendsByUserId(userId);
    }

    public List<User> getAllFriendRequests(Long userId) {
        return userRepository.findFriendRequestsByUserId(userId);
    }

    public List<User> searchFriend(Long userId, String input) {
        return userRepository.searchFriend(userId, input);
    }

}
