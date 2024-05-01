package app.service;

import app.dto.mapper.LikeMapper;
import app.dto.request.LikeRequest;
import app.dto.response.LikeResponse;
import app.entity.Like;
import app.entity.Post;
import app.entity.User;
import app.repository.LikeRepository;
import app.repository.PostRepository;
import app.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final LikeMapper likeMapper;

    public LikeResponse addLike(LikeRequest likeRequest) {
        User user = userRepository.findById(likeRequest.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + likeRequest.getUserId()));
        Post post = postRepository.findById(likeRequest.getPostId())
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + likeRequest.getPostId()));

        likeRepository.findByUserIdAndPostId(user.getId(), post.getId())
                .ifPresent(like -> {
                    throw new IllegalStateException("You already liked this post");
                });

        Like newLike = new Like();
        newLike.setUser(user);
        newLike.setPost(post);

        Like savedLike = likeRepository.save(newLike);
        post.setLikes(post.getLikes() + 1);
        postRepository.save(post);

        return likeMapper.toLikeResponse(savedLike);
    }

    public LikeResponse getLikeById(Long likeId) {
        Like like = likeRepository.findById(likeId)
                .orElseThrow(() -> new EntityNotFoundException("Like not found with id: " + likeId));
        return likeMapper.toLikeResponse(like);
    }

    public void removeLike(Long likeId) {
        Like like = likeRepository.findById(likeId)
                .orElseThrow(() -> new EntityNotFoundException("Like not found with id: " + likeId));

        Post post = like.getPost();
        post.setLikes(post.getLikes() - 1);
        postRepository.save(post);

        likeRepository.delete(like);
    }
}
