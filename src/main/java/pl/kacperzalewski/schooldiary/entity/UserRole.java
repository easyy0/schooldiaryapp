package pl.kacperzalewski.schooldiary.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_roles")
public class UserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    private String name;

}