package app.controller;

import app.entity.Friend;
import app.entity.User;
import app.exception.ResourceNotFoundException;
import app.service.FriendService;
import app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/friends")
@RequiredArgsConstructor
public class FriendController {
    private final FriendService friendService;
    private final UserService userService;

    @PostMapping("/add-friend")
    @ResponseStatus(HttpStatus.CREATED)
    public Friend sendFriendRequest(@RequestParam Long friendId) {
        return friendService.sendFriendRequest(userService.getCurrentUserId(), friendId);
    }

    @PostMapping("/accept-friend")
    @ResponseStatus(HttpStatus.OK)
    public Friend acceptFriendRequest(@RequestParam Long friendId) {
        return friendService.acceptFriendRequest(userService.getCurrentUserId(), friendId);
    }

    @DeleteMapping("/reject-friend")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void rejectFriendRequest(@RequestParam Long friendId) {
            friendService.rejectFriendRequest(userService.getCurrentUserId(), friendId);
    }

    @DeleteMapping("/delete-friend")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void terminateFriendship(@RequestParam Long friendId) {
        friendService.terminateFriendship(userService.getCurrentUserId(), friendId);
    }

    @GetMapping("/my-friends")
    public List<User> getAllFriends(){
        return friendService.getAllFriends(userService.getCurrentUserId());
    }

    @GetMapping("/my-friend-requests")
    public List<User> getAllFriendRequests(){
        return friendService.getAllFriendRequests(userService.getCurrentUserId());
    }

    @GetMapping("/search-friend")
    public List<User> searchFriend(@RequestParam String input){
        return friendService.searchFriend(userService.getCurrentUserId(), input);
    }
}
