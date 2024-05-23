package app.controller;

import app.dto.request.CommentRequest;
import app.dto.response.CommentResponse;
import app.entity.User;
import app.service.CommentService;
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
@RequiredArgsConstructor
@RequestMapping("/api/v1/comments")
public class CommentController {
    private final UserService userService;
    private final CommentService commentService;

    @PostMapping("/comment")
    public ResponseEntity<CommentResponse> createComment(@RequestBody CommentRequest commentRequest) {

        User authUser = userService.getAuthUser();
        if (!authUser.isActivated()) {
            // Unauthorized access
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // User authorized
        CommentResponse commentResponse = commentService.createComment(commentRequest);
        return ResponseEntity.ok().body(commentResponse);
    }

    @GetMapping("/fetch/{commentId}")
    public ResponseEntity<CommentResponse> getCommentById(@PathVariable Long commentId) {
        CommentResponse commentResponse = commentService.getCommentById(commentId);
        if (commentResponse != null) {
            return ResponseEntity.ok(commentResponse);
        }
        return ResponseEntity.notFound().build();
    }

    // Get all comments related to post
//    @GetMapping("/post/{postId}")
//    public ResponseEntity<List<CommentResponse>> getAllCommentsByPostId(@PathVariable Long postId) {
//        List<CommentResponse> comments = commentService.getAllCommentsByPostId(postId);
//        if (!comments.isEmpty()) {
//            return ResponseEntity.ok(comments);
//        }
//        return ResponseEntity.notFound().build();
//    }

    @GetMapping("/post/{postId}")
    @ResponseStatus(HttpStatus.OK)
    public Page<CommentResponse> getPageAllCommentsByPostId(@PathVariable Long postId,
                                                            @RequestParam(defaultValue = "0") Integer page,
                                                            @RequestParam(defaultValue = "5") Integer size,
                                                            @RequestParam(defaultValue = "createdDate") String sortBy,
                                                            @RequestParam(defaultValue = "desc") String sortDir) {

        return commentService.getPageAllCommentsByPostId(postId, page, size, sortBy, sortDir);
    }


    @PutMapping("/update/{commentId}")
    public ResponseEntity<CommentResponse> updateComment(@PathVariable Long commentId, @RequestBody CommentRequest commentRequest) {
        CommentResponse updatedComment = commentService.updateComment(commentId, commentRequest);
        if (updatedComment != null) {
            return ResponseEntity.ok(updatedComment);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        boolean isDeleted = commentService.deleteComment(commentId);
        if (isDeleted) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}

