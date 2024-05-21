package app.controller;

import app.dto.request.LikeRequest;
import app.entity.User;
import app.repository.LikeRepository;
import app.service.LikeService;
import app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/likes")
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;
    private final UserService userService;
    private final LikeRepository likeRepository;

    @PostMapping("/like")
    public ResponseEntity<String> createLike(@RequestBody LikeRequest likeRequest) {
        User user = userService.getAuthUser();
        Long userId = user.getId();

        if (likeRepository.findByUserIdAndPostId(userId, likeRequest.getPostId()).
                isPresent()) return ResponseEntity.ok().body("You liked this post already");

        likeService.addLike(likeRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("Like added");
    }

    @DeleteMapping("/remove/{likeId}")
    public ResponseEntity<Void> deleteLike(@PathVariable Long likeId) {
        likeService.removeLike(likeId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<Void> deleteLikeByPostId(@PathVariable Long postId) {
        User user = userService.getAuthUser();
        Long userId = user.getId();  // Extract user ID from security context

        likeService.removeLikeByPost(postId, userId);
        return ResponseEntity.noContent().build();
    }
}

