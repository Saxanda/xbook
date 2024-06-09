package app.repository;

import app.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserById(Long id);
    Optional<User> findUserByEmail(String email);
    boolean existsUserByEmail(String email);
    User findByConfirmationToken(String confirmationToken);

    List<User> findByNameContaining(String name);

    @Query(value = "SELECT u.* FROM users u " +
            "INNER JOIN friends f " +
            "ON u.id = f.friend_id AND f.status ='ACCEPTED'  " +
            "WHERE f.user_id = :userId",
            nativeQuery = true)
    Page<User> findFriendsByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query(value = "SELECT u.* FROM users u " +
            "INNER JOIN friends f " +
            "ON u.id = f.friend_id AND f.status ='ACCEPTED'  " +
            "WHERE f.user_id = :userId",
            nativeQuery = true)
    List<User> findFriendsById(@Param("userId") Long userId);

    @Query(value = "SELECT u.* FROM users u " +
            "INNER JOIN friends f " +
            "ON u.id = f.friend_id AND f.status ='PENDING'  " +
            "WHERE f.user_id = :userId",
            nativeQuery = true)
    Page<User> findFriendRequestsByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query(value = "SELECT u.* FROM users u " +
            "INNER JOIN friends f " +
            "ON u.id = f.friend_id AND f.status ='ACCEPTED' " +
            "WHERE f.user_id = :userId AND " +
            "((LOWER(REPLACE(CONCAT(name, ' ', surname), ' ', '')) LIKE LOWER(CONCAT('%', REPLACE(:input, ' ', ''), '%'))) " +
            "OR (LOWER(REPLACE(CONCAT(surname, ' ', name), ' ', '')) LIKE LOWER(CONCAT('%', REPLACE(:input, ' ', ''), '%'))));",
            nativeQuery = true)
    Page<User> searchFriend(Long userId, String input, Pageable pageable);

    Page<User> findAll(Pageable pageable);

    @Query(value = "SELECT u.* FROM users u " +
            "WHERE u.is_activated = true AND " +
            "(LOWER(REPLACE(CONCAT(u.name, ' ', u.surname), ' ', '')) LIKE LOWER(CONCAT('%', REPLACE(:input, ' ', ''), '%')) " +
            "OR LOWER(REPLACE(CONCAT(u.surname, ' ', u.name), ' ', '')) LIKE LOWER(CONCAT('%', REPLACE(:input, ' ', ''), '%')));",
            nativeQuery = true)
    List<User> searchUsersByInput(@Param("input") String input);
}
