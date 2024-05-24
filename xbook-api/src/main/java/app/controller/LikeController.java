package app.controller;

import app.dto.request.LikeRequest;
import app.entity.Post;
import app.entity.User;
import app.repository.LikeRepository;
import app.repository.PostRepository;
import app.service.LikeService;
import app.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/likes")
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;
    private final UserService userService;
    private final PostRepository postRepository;
    private final LikeRepository likeRepository;

    @PostMapping("/like")
    public ResponseEntity<String> createLike(@RequestBody LikeRequest likeRequest) {

        User user = userService.getAuthUser();
        Long userId = user.getId();

        // Check if the post exists and if the like already exists
        Optional<Post> optionalPost = postRepository.findById(likeRequest.getPostId());
        if (!optionalPost.isPresent()) {
            throw new EntityNotFoundException("Post not found with id: " + likeRequest.getPostId());
        }
        if (likeRepository.findByUserIdAndPostId(userId, likeRequest.getPostId()).isPresent()) {
            return ResponseEntity.ok("You liked this post already");
        }
        // Add like to the post
        likeService.addLike(user, likeRequest.getPostId());
        return ResponseEntity.status(HttpStatus.CREATED).body("Like added");
    }


    @DeleteMapping("/remove/{likeId}")
    public ResponseEntity<Void> deleteLike(@PathVariable Long likeId) {
        likeService.removeLike(likeId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<String> deleteLikeByPostId(@PathVariable Long postId) {
        User user = userService.getAuthUser();
        Long userId = user.getId();  // Extract user ID from security context

        likeService.removeLikeByPost(postId, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body("Like removed from post with id:" + postId);
    }
}

