package app.repository;

import app.entity.Chat;
import app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByChatParticipantsContainingOrderByLastModifiedDateDesc(User user);

    List<Chat> findChatsByChatParticipantsContainsAndChatParticipantsContains(User participant1, User participant2);
}
