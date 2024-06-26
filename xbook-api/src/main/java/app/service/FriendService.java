package app.service;

import app.entity.Friend;
import app.entity.FriendshipStatus;
import app.entity.User;
import app.exception.ResourceNotFoundException;
import app.repository.FriendRepository;
import app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<Friend> getOptionalFriend(Long userId, Long friendId) {
        return friendRepository.findByUserIdAndFriendId(userId, friendId);
    }

    public FriendshipStatus getFriendshipStatus(Long userId, Long friendId) {
        if (getOptionalFriend(userId, friendId).isPresent()) {
            return getOptionalFriend(userId, friendId).get().getStatus();
        } else if(getOptionalFriend(friendId, userId).isPresent()) {
            return getOptionalFriend(friendId, userId).get().getStatus();
        } else {
            return FriendshipStatus.NONE;
        }
    }

    public Friend updateFriend(Friend friend, FriendshipStatus friendshipStatus) {
        friend.setStatus(friendshipStatus);
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
            Friend sentFriend = new Friend(user, friend, FriendshipStatus.SENT);
            Friend pendingFriend = new Friend(friend, user, FriendshipStatus.PENDING);
            createFriend(pendingFriend);
            return createFriend(sentFriend);
        }
    }

    public Friend acceptFriendRequest(Long userId, Long friendId) {
        if (!existFriend(userId, friendId)) {
            throw new DataIntegrityViolationException("This friend already exists.");
        } else {
            User user = getUserById(userId);
            User friend = getUserById(friendId);
            updateFriend(getFriend(friendId, userId), FriendshipStatus.ACCEPTED);
            return updateFriend(getFriend(userId, friendId), FriendshipStatus.ACCEPTED);
        }
    }

    public void rejectFriendRequest(Long userId, Long friendId) {
        terminateFriendship(userId, friendId);
    }

    public void terminateFriendship(Long userId, Long friendId) {
        deleteFriend(getFriend(userId, friendId));
        deleteFriend(getFriend(friendId, userId));
    }

    public List<User> getAll(Long userId) {
        return userRepository.findFriendsById(userId);
    }

    public Page<User> getAllFriends(Long userId, Integer page, Integer size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return userRepository.findFriendsByUserId(userId, pageable);
    }

    public Page<User> getAllFriendRequests(Long userId, Integer page, Integer size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return userRepository.findFriendRequestsByUserId(userId, pageable);
    }

    public Page<User> searchFriend(Long userId, String input, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.searchFriend(userId, input, pageable);
    }

}