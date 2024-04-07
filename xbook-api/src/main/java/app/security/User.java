package app.security;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "users")
@NoArgsConstructor
public class User extends AbstractEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String username;
    private String password;
    private String roles;
    private String email;
    private final static String DELIMITER = ":";

    public User(String username, String password, String... roles) {
        this.username = username;
        this.password = password;
        setRoles(roles);
    }
    public String[] getRoles() {
        return roles.split(":");
    }

    public void setRoles(String[] roles) {
        this.roles = String.join(DELIMITER, roles);
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
