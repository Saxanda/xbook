package app.entity;

import jakarta.persistence.CascadeType;
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

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User user;

    @Lob
    @Column(name = "content", columnDefinition = "CLOB")
    private String content;

    @Column(name = "post_id")
    private Long postID;

}