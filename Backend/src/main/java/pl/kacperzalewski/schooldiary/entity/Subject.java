package pl.kacperzalewski.schooldiary.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
    name = "subject",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = "name")
    }
)
@Builder
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Subject {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, length = 50)
    private String name;
}