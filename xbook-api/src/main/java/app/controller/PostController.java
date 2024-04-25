
package app.controller;

import app.dto.request.PostRequest;
import app.dto.response.PostResponse;
import app.entity.User;
import app.repository.UserRepository;
import app.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class PostController {

    private final UserDetailsService userDetailsService;
    private final PostService postService;
    private final UserRepository userRepository;

    @PostMapping("/posts")
    public ResponseEntity<PostResponse> createPost(@RequestBody PostRequest postRequest,
                                                   @RequestParam(required = false) Long originalPostId) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        Long userId = getUserIdFromAuthentication(userDetails);
        if (userId == null) {
            // Handle user ID not found
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        PostResponse createdPost = postService.createPost(postRequest, userId, originalPostId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
    }

    private Long getUserIdFromAuthentication(UserDetails userDetails) {
        // Logic to extract user ID from UserDetails
        if (userDetails instanceof org.springframework.security.core.userdetails.User) {
            String email = ((org.springframework.security.core.userdetails.User) userDetails).getUsername();
            // Use username to retrieve user ID from your database or user service
            Optional<User> userOptional = userRepository.findUserByEmail(email);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                return user.getId();
            }
        }
        return null;
    }

   @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPosts() {
        List<PostResponse> allPosts = postService.getAllPosts();
        return ResponseEntity.ok(allPosts);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable Long postId) {
        PostResponse post = postService.getPostById(postId);
        return ResponseEntity.ok(post);
    }

    @PutMapping("/{postId}")
    public ResponseEntity<PostResponse> updatePost(@PathVariable Long postId, @RequestBody PostRequest postRequest) {
        PostResponse updatedPost = postService.updatePost(postId, postRequest);
        return ResponseEntity.ok(updatedPost);
    }

    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
        return ResponseEntity.noContent().build();
    }
}
