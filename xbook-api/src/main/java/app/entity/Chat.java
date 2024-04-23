package app.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Chat extends AbstractEntity {
    public Chat (List<User> chatParticipants) {
        setChatParticipants(chatParticipants);
    }

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "chat_user",
            joinColumns = @JoinColumn(name = "chat_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id")
    )
    private List<User> chatParticipants;

    @OneToMany(mappedBy = "chat", cascade = CascadeType.ALL)
    private List<Message> messages = new ArrayList<>();

    @Override
    public String toString() {
        String sb = "Chat{" + "chatId=" + this.getId() +
                ", createdDate=" + this.getCreatedDate() +
                '}';
        return sb;
    }
}
