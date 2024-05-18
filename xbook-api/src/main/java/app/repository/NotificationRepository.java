package app.repository;

import app.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository <Notification,Long> {
    List<Notification> findByRecipient(Long recipientId);
    Page<Notification> findByRecipient(Long recipientId, Pageable pageable);
}
