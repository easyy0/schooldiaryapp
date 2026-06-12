package pl.kacperzalewski.schooldiary.entity;

import jakarta.persistence.*;
import lombok.*;
import pl.kacperzalewski.schooldiary.entity.SchoolClass.SchoolClass;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "timeTable")
public class Timetable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private SchoolClass schoolClass;

    private LocalDate validFrom;
    private LocalDate validTo;

    @OneToMany(mappedBy = "timetable", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TimetableLesson> lessons;
}
