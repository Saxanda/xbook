package app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@Table(name = "notifications")
public class Notification extends AbstractEntity {
    /**
     * Constructs a Notification for a specific type with details.
     *
     * @param sender     The user who is the origin of the notification.
     * @param recipient  The user who is the intended recipient of the notification.
     * @param message    The message or description of the notification.
     * @param type       The type of notification.
     * @param post       The related post, if applicable.
     * @param readStatus The read status of the notification.
     */
    public Notification(User sender, User recipient, String message, NotificationType type, Post post, boolean readStatus) {
        this.sender = sender;
        this.recipient = recipient;
        this.message = message;
        this.type = type;
        this.post = post;
        this.readStatus = readStatus;
    }

    @Column(nullable = false)
    private String message;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private User sender; // User ID who sends notification

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;  // Reference to the Post entity

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipient_id", nullable = false)
    private User recipient; // Friend ID to whom the notification is targeted

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private NotificationType type;

    @Column(nullable = false)
    private boolean readStatus;
}