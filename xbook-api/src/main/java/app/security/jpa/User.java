package app.security.jpa;

import app.entity.AbstractEntity;
import app.entity.Comment;

import app.entity.Post;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.ConnectionBuilder;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
@Table(name = "users")
@NoArgsConstructor
public class User extends AbstractEntity {
    private String username;
    private String password;
    private String roles;
   // @Column(unique = true, nullable = false, length = 50)
    private String email;
    private String name;
    private String surname;
    private String photo;
    private String avatar;
    private String address;
    private Date dob; // Date of Birth

    private final static String DELIMITER = ":";
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();


    public User(String username, String password, String... roles) {
        this.username = username;
        this.password = password;
        setRoles(roles);
        this.setCreatedDate(LocalDateTime.now()); // Set default value
    }

    public static User withUsername(String username) {
        User builder = new User();
        builder.username = username;
        return builder;
    }
//   public User(String user, String encode, String role) {
//        super();
//    }

    public String[] getRoles() {
        return roles.split(":");
    }

    public void setRoles(String[] roles) {
        this.roles = String.join(DELIMITER, roles);
    }

//    public void setEmail(String email) {
//        this.email = email;
//    }
}
