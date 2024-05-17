package app.service;

import app.dto.mapper.PostMapper;
import app.dto.request.PostRequest;
import app.dto.response.PostResponse;
import app.entity.Post;
import app.entity.PostType;
import app.entity.User;
import app.repository.LikeRepository;
import app.repository.PostRepository;
import app.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final LikeRepository likeRepository;
    private final NotificationService notificationService;
    private final PostMapper postMapper;

    public PostResponse createPost(PostRequest postRequest, Long userId, Long originalPostId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Post post = postMapper.toPostRequest(postRequest);
        post.setUser(user);

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

    public List<PostResponse> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        return posts.stream()
                .map(postMapper::toPostResponse)
                .collect(Collectors.toList());
    }

    public Page<PostResponse> getPageAllPosts(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page,size);
        return postRepository.findAll(pageable)
                .map(postMapper::toPostResponse);
    }

    public PostResponse getPostById(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost.map(postMapper::toPostResponse).orElse(null);
    }

    public PostResponse updatePost(Long postId, PostRequest postRequest) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            postMapper.updatePostFromRequest(postRequest, post);
            Post updatedPost = postRepository.save(post);
            return postMapper.toPostResponse(updatedPost);
        }
        return null;
    }

    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }

}
