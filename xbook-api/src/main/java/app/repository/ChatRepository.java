package app.repository;

import app.entity.Chat;
import app.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByChatParticipantsContainingOrderByLastModifiedDateDesc(User user);

    Page<Chat> findByChatParticipantsContainingOrderByLastModifiedDateDesc(User user, Pageable pageable);

    List<Chat> findChatsByChatParticipantsContainsAndChatParticipantsContains(User participant1, User participant2);
}
