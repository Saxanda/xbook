package app.controller;

import app.dto.mapper.FriendMapper;
import app.dto.mapper.UserMapper;
import app.dto.response.FriendResponse;
import app.dto.response.UserDetailsResponse;
import app.entity.Friend;
import app.service.FriendService;
import app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/friends")
@RequiredArgsConstructor
public class FriendController {
    private final FriendService friendService;
    private final UserService userService;
    private final FriendMapper friendMapper;
    private final UserMapper userMapper;

    @PostMapping("/add-friend/{friendId}")
    @ResponseStatus(HttpStatus.CREATED)
    public FriendResponse sendFriendRequest(@PathVariable("friendId") Long friendId) {
        Friend friend = friendService.sendFriendRequest(userService.getCurrentUserId(), friendId);
        FriendResponse friendResponse = friendMapper.friendToFriendResponse(friend);
        return friendResponse;
    }

    @PostMapping("/accept-friend/{friendId}")
    @ResponseStatus(HttpStatus.CREATED)
    public FriendResponse acceptFriendRequest(@PathVariable("friendId") Long friendId) {
        Friend friend = friendService.acceptFriendRequest(userService.getCurrentUserId(), friendId);
        FriendResponse friendResponse = friendMapper.friendToFriendResponse(friend);
        return friendResponse;
    }

    @DeleteMapping("/reject-friend/{friendId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void rejectFriendRequest(@PathVariable("friendId") Long friendId) {
        friendService.rejectFriendRequest(userService.getCurrentUserId(), friendId);
    }

    @DeleteMapping("/delete-friend/{friendId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void terminateFriendship(@PathVariable("friendId") Long friendId) {
        friendService.terminateFriendship(userService.getCurrentUserId(), friendId);
    }

    @GetMapping("/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public Page<UserDetailsResponse> getAllFriends(@PathVariable("userId") Long userId,
                                                   @RequestParam(defaultValue = "0") Integer page,
                                                   @RequestParam(defaultValue = "5") Integer size) {
        return friendService.getAllFriends(userId, page, size)
                .map(userMapper::userDetailsResponse);
    }

    @GetMapping("/requests")
    @ResponseStatus(HttpStatus.OK)
    public Page<UserDetailsResponse> getAllFriendRequests(@RequestParam(defaultValue = "0") Integer page,
                                                          @RequestParam(defaultValue = "5") Integer size) {
        return friendService.getAllFriendRequests(userService.getCurrentUserId(), page, size)
                .map(userMapper::userDetailsResponse);
    }

    @GetMapping("/search")
    @ResponseStatus(HttpStatus.OK)
    public Page<UserDetailsResponse> searchFriend(@RequestParam("userId") Long userId,
                                                  @RequestParam("input") String input,
                                                  @RequestParam(defaultValue = "0") Integer page,
                                                  @RequestParam(defaultValue = "5") Integer size) {
        return friendService.searchFriend(userId, input, page, size)
                .map(userMapper::userDetailsResponse);
    }
}