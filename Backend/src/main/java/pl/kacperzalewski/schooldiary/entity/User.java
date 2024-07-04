package pl.kacperzalewski.schooldiary.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import pl.kacperzalewski.schooldiary.entity.enums.UserRole;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @JsonIgnore
    @Column(name = "username", unique = true)
    private String username;
    @JsonIgnore
    private String password;

    private String firstname;
    private String lastname;

    @Enumerated(EnumType.STRING)
    private UserRole role;


}