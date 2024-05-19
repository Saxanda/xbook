package app.service;

import app.dto.mapper.PostMapper;
import app.dto.request.PostRequest;
import app.dto.response.PostResponse;
import app.dto.response.UserDetailsResponse;
import app.entity.Post;
import app.entity.PostType;
import app.entity.User;
import app.exception.ResourceNotFoundException;
import app.repository.BookmarkRepository;
import app.repository.LikeRepository;
import app.repository.PostRepository;
import app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;
    private final PostMapper postMapper;
    private final UserService userService;
    private final LikeRepository likeRepository;
    private final BookmarkRepository bookmarkRepository;

    public PostResponse createPost(PostRequest postRequest, Long userId, Long originalPostId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Post post = postMapper.toPostRequest(postRequest);
        post.setUser(user);
        post.setTimestamp(LocalDateTime.now());  // Explicitly setting the timestamp
        if (originalPostId != null) {
            // This is a repost
            Post originalPost = postRepository.findById(originalPostId)
                    .orElseThrow(() -> new IllegalArgumentException("Original post not found"));
            post.setType(PostType.REPOST); //PostType.REPOST exists to indicate a repost type
            post.setOriginalPost(originalPost);
        } else {
            // This is an original post
            post.setType(PostType.ORIGINAL);
        }
        Post savedPost = postRepository.save(post);
        notificationService.postNotification(savedPost);
        return postMapper.toPostResponse(savedPost);
    }

    public PostResponse getPostDetails(Long postId, Long currentUserId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found"));
        // Get information about author details
        UserDetailsResponse userDetailsResponse = userService.getUserDetails(post.getUser().getId());
        int likesCount = post.getLikes();
        int commentsCount = post.getComments().size();
        int repostsCount = postRepository.countByOriginalPostId(postId);
        boolean isBookmarked = bookmarkRepository.existsByPostIdAndUserId(postId, currentUserId);
        boolean isLiked = likeRepository.existsByPostIdAndUserId(postId, currentUserId);
        PostResponse originalPostResponse = null;
        if (post.getType() == PostType.REPOST && post.getOriginalPost() != null) {
            originalPostResponse = mapToBasicPostResponse(post.getOriginalPost(), userDetailsResponse);//to Avoid Recursion for future
        }
        return new PostResponse(
                post.getId(),
                userDetailsResponse, // to UserDetailsResponse constructor
                post.getTimestamp(),
                post.getTitle(),
                post.getBody(),
                post.getMedia(),
                originalPostResponse, // Handling of originalPost
                post.getType(),
                likesCount,
                isLiked,
                commentsCount,
                repostsCount,
                isBookmarked
        );
    }

    private PostResponse mapToBasicPostResponse(Post post, UserDetailsResponse userDetailsResponse) {
        return new PostResponse(
                post.getId(),
                userDetailsResponse,
                post.getTimestamp(),
                post.getTitle(),
                post.getBody(),
                post.getMedia(),
                null, // No original post
                post.getType(),
                post.getLikes(),
                false, // Not  liked
                post.getComments().size(),
                0, // No repost count
                false  // Not  bookmark
        );
    }
//    public List<PostResponse> getAllPosts() {
//        List<Post> posts = postRepository.findAll();
//        return posts.stream()
//                .map(postMapper::toPostResponse)
//                .collect(Collectors.toList());
//    }

    public Page<PostResponse> getPageAllPosts(Integer page, Integer size) {
        // sorting by 'timestamp' in descending order
        Pageable pageable = PageRequest.of(page, size, Sort.by("timestamp").descending());
        return postRepository.findAll(pageable)
                .map(post -> getPostDetails(post.getId(), userService.getAuthCurrentUserId()));
    }

    public PostResponse getPostById(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost
                .map(post -> getPostDetails(post.getId(), userService.getAuthCurrentUserId()))
                .orElse(null);
    }

//    public PostResponse updatePost(Long postId, PostRequest postRequest) {
//        Optional<Post> optionalPost = postRepository.findById(postId);
//        if (optionalPost.isPresent()) {
//            Post post = optionalPost.get();
//            postMapper.updatePostFromRequest(postRequest, post);
//            Post updatedPost = postRepository.save(post);
//            return postMapper.toPostResponse(updatedPost);
//        }
//        return null;
//    }
    public PostResponse updatePost(Long postId, PostRequest postRequest) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            throw new ResourceNotFoundException("Post not found with id: " + postId);
        }

        Post post = optionalPost.get();
        postMapper.updatePostFromRequest(postRequest, post);

        // Update the post and get the updated entity
        Post updatedPost = postRepository.save(post);

        // User and post information
        return getPostDetails(updatedPost.getId(), userService.getAuthCurrentUserId());
    }
    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }

}
