package app.service;

import app.entity.Like;
import app.entity.Post;
import app.entity.User;
import app.repository.LikeRepository;
import app.repository.UserRepository;
import app.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class LikeService {

    private final LikeRepository likeRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final LikeMapper likeMapper;

    public LikeResponse createLike(Long userId, Long postId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + postId));

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
