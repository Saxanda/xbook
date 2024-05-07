package app.repository;

import app.entity.Bookmark;
import app.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookmarkRepository extends JpaRepository <Bookmark, Long> {
    List<Bookmark> findByUserId(Long userId);

    List<Bookmark> findByPostId(Long postId);
}
