
package app.controller;

import app.dto.request.PostRequest;
import app.dto.response.PostResponse;
import app.entity.User;
import app.service.PostService;
import app.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final UserService userService;

    @PostMapping("/post")
    // originalPostId as a parameter allows the method to support creating two types of posts
    public ResponseEntity<PostResponse> createPost(@RequestBody PostRequest postRequest,
                                                   @RequestParam(required = false) Long originalPostId) {

        User authUser = userService.getAuthUser();
        if (!authUser.isActivated()) {
            // Unauthorized access
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        // User authorized
        Long userId = userService.getAuthCurrentUserId();

        PostResponse createdPost = postService.createPost(postRequest, userId, originalPostId);

        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Page<PostResponse> getPageAllPosts(@RequestParam(defaultValue = "0") Integer page,
                                              @RequestParam(defaultValue = "5") Integer size,
                                              @RequestParam(defaultValue = "createdDate") String sortBy,
                                              @RequestParam(defaultValue = "desc") String sortDir) {
        return postService.getPageAllPosts(page, size, sortBy, sortDir);
    }

    @GetMapping("/fetch/{postId}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable Long postId) {
        PostResponse post = postService.getPostById(postId);
        return ResponseEntity.ok(post);
    }

    @GetMapping("/get/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public Page<PostResponse> getPostByUserId(@PathVariable Long userId,
                                              @RequestParam(defaultValue = "0") Integer page,
                                              @RequestParam(defaultValue = "5") Integer size,
                                              @RequestParam(defaultValue = "createdDate") String sortBy,
                                              @RequestParam(defaultValue = "desc") String sortDir) {

        return postService.getAllUserPostsAsList(userId, page, size, sortBy, sortDir);
    }

    @PutMapping("/update/{postId}")
    public ResponseEntity<PostResponse> updatePost(@PathVariable Long postId, @RequestBody PostRequest postRequest) {
        PostResponse updatedPost = postService.updatePost(postId, postRequest);
        return ResponseEntity.ok(updatedPost);
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
        return ResponseEntity.noContent().build();
    }
}
