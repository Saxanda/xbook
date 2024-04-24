package app.controller;

import app.entity.Friend;
import app.exception.ResourceNotFoundException;
import app.service.FriendService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/friends")
@RequiredArgsConstructor
public class FriendController {
    private final FriendService friendService;

    @PostMapping("/add-friend")
    @ResponseStatus(HttpStatus.CREATED)
    public Friend sendFriendRequest(@RequestParam Long userId, @RequestParam Long friendId) {
        return friendService.sendFriendRequest(userId, friendId);
    }

    @PostMapping("/accept-friend")
    @ResponseStatus(HttpStatus.OK)
    public Friend acceptFriendRequest(@RequestParam Long userId, @RequestParam Long friendId) {
        return friendService.acceptFriendRequest(userId, friendId);
    }

    @DeleteMapping("/reject-friend")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void rejectFriendRequest(@RequestParam Long userId, @RequestParam Long friendId) {
            friendService.rejectFriendRequest(userId, friendId);
    }

    @DeleteMapping("/delete-friend")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void terminateFriendship(@RequestParam Long userId, @RequestParam Long friendId) {
        friendService.terminateFriendship(userId, friendId);
    }

}
