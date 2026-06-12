package pl.kacperzalewski.schooldiary.entity.SchoolClass;

import jakarta.persistence.*;
import lombok.*;
import pl.kacperzalewski.schooldiary.entity.Subject;
import pl.kacperzalewski.schooldiary.entity.User;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "school_class")
public class SchoolClass {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @ManyToMany
    @JoinTable(
            name = "school_class_subject_list",
            joinColumns = @JoinColumn(name = "school_class_id"),
            inverseJoinColumns = @JoinColumn(name = "subject_id")
    )
    @ToString.Exclude
    private List<Subject> subjectList;

    @OneToMany(mappedBy = "schoolClass")
    @ToString.Exclude
    private List<User> students;
}