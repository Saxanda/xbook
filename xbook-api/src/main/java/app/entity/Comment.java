package app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.FetchType;
import lombok.Data;

@Data
@Entity
@Table(name = "comments")
public class Comment extends AbstractEntity {

    // Other fields and mappings...
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @Lob
    @Column(name = "content", columnDefinition = "CLOB")
    private String content;



}