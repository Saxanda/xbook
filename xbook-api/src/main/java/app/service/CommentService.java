package app.service;

import app.dto.request.CommentRequest;
import app.dto.response.CommentResponse;
import app.dto.response.UserDetailsResponse;
import app.entity.Comment;
import app.entity.Post;
import app.entity.User;
import app.repository.CommentRepository;
import app.repository.PostRepository;
import app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final NotificationService notificationService;
    private final UserService userService;

    @Transactional
    public CommentResponse createComment(CommentRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + request.getUserId()));
        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> new IllegalArgumentException("Post not found with ID: " + request.getPostId()));

        Comment comment = new Comment();
        comment.setUser(user);
        comment.setPost(post);
        comment.setContent(request.getContent());
        comment.setTimestamp(LocalDateTime.now());  // Set the timestamp
        Comment savedComment = commentRepository.save(comment);

        notificationService.commentNotification(savedComment);
        return mapToCommentResponse(savedComment);
    }

//    public List<CommentResponse> getAllComments() {
//        List<Comment> comments = commentRepository.findAll();
//        return comments.stream()
//                .map(commentMapper::toCommentResponse)
//                .collect(Collectors.toList());
//    }

//    public List<CommentResponse> getAllCommentsByPostId(Long postId) {
//        List<Comment> comments = commentRepository.findByPostId(postId);
//        return comments.stream()
//                .map(commentMapper::toCommentResponse)
//                .collect(Collectors.toList());
//    }

    public Page<CommentResponse> getPageAllCommentsByPostId(Long postId, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        Page<Comment> commentPage = commentRepository.findByPostId(postId, pageable);
        return commentPage.map(this::mapToCommentResponse);
    }

    public CommentResponse getCommentById(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));
        return mapToCommentResponse(comment);
    }

    public CommentResponse updateComment(Long commentId, CommentRequest commentRequest) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));
        comment.setContent(commentRequest.getContent());
        // Other optionals to add ...TODO
        commentRepository.save(comment);
        return mapToCommentResponse(comment);
    }

    public boolean deleteComment(Long commentId) {
        if (!commentRepository.existsById(commentId)) {
            throw new IllegalArgumentException("Comment not found");
        }
        commentRepository.deleteById(commentId);
        return true;
    }

//    public CommentResponse getCommentDetails(Long commentId) {
//        Comment comment = commentRepository.findById(commentId)
//                .orElseThrow(() -> new ResourceNotFoundException("Comment with ID: " + commentId + " not found"));
//        if (comment.getUser() == null) {
//            throw new IllegalStateException("Comment is missing user details");
//        }
//        return mapToCommentResponse(comment);
//    }

    private CommentResponse mapToCommentResponse(Comment comment) {
        User user = comment.getUser();
        UserDetailsResponse userDetailsResponse = userService.getUserDetails(user.getId());
        return new CommentResponse(
                comment.getId(),
                comment.getContent(),
                comment.getTimestamp(),
                userDetailsResponse,
                comment.getPost().getId() // User's comments under the post
        );
    }
}

