package app.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "posts")
public class Post extends AbstractEntity{

    // Other fields and mappings...

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // Constructors, getters, and setters...
}