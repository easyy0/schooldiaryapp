package pl.kacperzalewski.schooldiary.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import pl.kacperzalewski.schooldiary.entity.SchoolClass.SchoolClass;
import pl.kacperzalewski.schooldiary.entity.enums.UserRole;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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

    @ManyToOne
    @JoinColumn(name = "class_id")
    @ToString.Exclude
    private SchoolClass schoolClass;
}