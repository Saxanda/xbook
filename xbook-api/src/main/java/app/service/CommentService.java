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

//    public Page<CommentResponse> getPageAllCommentsByPostId(Long postId, Integer page, Integer size) {
//        //Check if such post exist
//        postRepository.findById(postId).orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + postId));
//
//        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").ascending()); // New comment at the bottom
//
//        Page<Comment> commentPage = commentRepository.findByPostId(postId, pageable);
//
//        if (commentPage.isEmpty()) {
//            throw new EntityNotFoundException("Post does not have any comment");
//        }
//        return commentPage.map(this::mapToCommentResponse);
//    }

    public Page<CommentResponse> getPageAllCommentsByPostId(Long postId, Integer page, Integer size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return commentRepository.findByPostId(postId, pageable).map(this::mapToCommentResponse);
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

    private CommentResponse mapToCommentResponse(Comment comment) {
        User user = comment.getUser();
        UserDetailsResponse userDetailsResponse = userService.getUserDetails(user.getId());
        return new CommentResponse(
                comment.getId(),
                comment.getContent(),
                comment.getCreatedDate(),
                userDetailsResponse,
                comment.getPost().getId() // User's comments under the post
        );
    }
}

