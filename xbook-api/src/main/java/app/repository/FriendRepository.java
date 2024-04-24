package app.repository;

import app.entity.Friend;
import app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {
   Optional<Friend> findByUser_IdAndFriend_Id(Long userId, Long friendId);
   boolean existsByUser_IdAndFriend_Id(Long userId, Long friendId);
}
