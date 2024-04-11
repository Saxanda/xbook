package app.entity;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private static final String DELIMITER = ":";

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

    public String[] getRoles() {
        return roles.split(":");
    }

    public void setRoles(String[] roles) {
        this.roles = String.join(DELIMITER, roles);
    }

}
