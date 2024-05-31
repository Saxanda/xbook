package app.repository;

import app.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    Page<Message> findByChatId(Long chatId, Pageable pageable);

    @Query(value = "SELECT * FROM MESSAGE m WHERE m.status='SENT' and m.chat_id=:chatId", nativeQuery = true)
    List<Message> getAllSentMessages(@Param("chatId") Long chatId);
}
