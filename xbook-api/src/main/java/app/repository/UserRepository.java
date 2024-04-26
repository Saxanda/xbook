package app.repository;

import app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserById(Integer id);
    Optional<User> findUserByEmail(String email);
    boolean existsUserByEmail(String email);
    boolean existsUserById(Long id);
    User findByConfirmationToken(String confirmationToken);

    @Query(value = "SELECT u.* FROM users u " +
            "INNER JOIN friends f " +
            "ON u.id = f.friend_id AND f.status ='ACCEPTED'  " +
            "WHERE f.user_id = :userId",
            nativeQuery = true)
    List<User> findFriendsByUserId(@Param("userId") Long userId);

    @Query(value = "SELECT u.* FROM users u " +
            "INNER JOIN friends f " +
            "ON u.id = f.user_id AND f.status ='PENDING'  " +
            "WHERE f.friend_id = :userId",
            nativeQuery = true)
    List<User> findFriendRequestsByUserId(@Param("userId") Long userId);

    @Query(value = "SELECT u.* FROM users u " +
            "INNER JOIN friends f " +
            "ON u.id = f.friend_id AND f.status ='ACCEPTED' " +
            "WHERE f.user_id = :userId AND " +
            "((LOWER(REPLACE(CONCAT(name, ' ', surname), ' ', '')) LIKE LOWER(CONCAT('%', REPLACE(:input, ' ', ''), '%'))) " +
            "OR (LOWER(REPLACE(CONCAT(surname, ' ', name), ' ', '')) LIKE LOWER(CONCAT('%', REPLACE(:input, ' ', ''), '%'))));",
            nativeQuery = true)
    List<User> searchFriend(Long userId, String input);




}
