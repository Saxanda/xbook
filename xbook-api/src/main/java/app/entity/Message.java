package app.entity;

import app.utils.ContentType;
import app.utils.MessageStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message extends AbstractEntity{
    @Column
    @Enumerated(EnumType.STRING)
    private ContentType contentType;

    @Column
    private String content;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "chat_id")
    private Chat chat;

    @Column
    @Enumerated(EnumType.STRING)
    private MessageStatus status;

    public Message(ContentType contentType, String content, User sender, Chat chat) {
        this.contentType = contentType;
        this.content = content;
        this.sender = sender;
        this.chat = chat;
    }
}
