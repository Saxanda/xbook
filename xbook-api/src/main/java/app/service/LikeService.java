package app.service;

import app.dto.mapper.LikeMapper;
import app.dto.request.LikeRequest;
import app.dto.response.LikeResponse;
import app.entity.Like;
import app.entity.Post;
import app.entity.User;
import app.repository.LikeRepository;
import app.repository.UserRepository;
import app.repository.PostRepository;
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

    public LikeResponse createLike(LikeRequest likeRequest) {
        User user = userRepository.findById(likeRequest.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + likeRequest.getUserId()));
        Post post = postRepository.findById(likeRequest.getPostId())
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + likeRequest.getPostId()));

        Like like = new Like();
        like.setUser(user);
        like.setPost(post);

        Like savedLike = likeRepository.save(like);
        return likeMapper.toLikeResponse(savedLike);
    }

    public LikeResponse getLikeById(Long likeId) {
        Like like = likeRepository.findById(likeId)
                .orElseThrow(() -> new EntityNotFoundException("Like not found with id: " + likeId));
        return likeMapper.toLikeResponse(like);
    }

    public void deleteLike(Long likeId) {
        likeRepository.deleteById(likeId);
    }
}
