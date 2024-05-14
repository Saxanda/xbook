package app.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User extends AbstractEntity {
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String surname;
    @Column(unique = true, nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(name = "date_of_birth")
    private LocalDate dob;
    private String gender;
    private String role;
    private String photo;
    private String avatar;
    private String address;
    @Column(name = "confirmation_token")
    private String confirmationToken;// New User confirmation by email
    @Column(name = "is_activated")
    private boolean isActivated; //User account is activated by default "false"
}
