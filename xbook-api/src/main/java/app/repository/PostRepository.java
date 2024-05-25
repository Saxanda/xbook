package app.repository;

import app.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // You can add custom query methods here if needed
    Page<Post> findAll(Pageable pageable);

    int countByOriginalPostId(Long postId);

    Page<Post> findAllByUserId(Long userId, Pageable pageable);
}
