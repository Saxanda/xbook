package app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "posts")
public class Post extends AbstractEntity {

    // Other fields and mappings...
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    private String title; // Field for post title
    @Lob
    @Column(name = "body", columnDefinition = "CLOB")
    private String body;
    private String media;
    private int likes;
    private Long postID;
    private PostType type; // Post is original or repost

}