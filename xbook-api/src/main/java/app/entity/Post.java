package app.entity;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@Entity
@Table(name = "posts")

@EqualsAndHashCode(callSuper = false)
public class Post extends AbstractEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "title")
    private String title; // Field for post Title

    @Lob
    @Column(name = "body", columnDefinition = "CLOB")
    private String body; // Text Field

    @Column(name = "media")
    private String media;// URL to picture or Video ex. "https://static.xx.fbcdn.net/rsrc.php/y1/r/4lCu2zih0ca.svg"

    @Column(name = "likes")
    private int likes; // Likes counter

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private PostType type; // Post is original or repost

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "original_post_id")
    private Post originalPost; // In case there is a repost

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments; //to make possible to delete comments associated with post
}