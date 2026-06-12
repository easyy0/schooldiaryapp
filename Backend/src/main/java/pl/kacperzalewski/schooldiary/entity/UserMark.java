package pl.kacperzalewski.schooldiary.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import lombok.*;
import pl.kacperzalewski.schooldiary.entity.enums.Semester;
import java.time.LocalDateTime;

@Entity
@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserMark {
    @Id
    @GeneratedValue
    private Long id;

    private String title;

    @ManyToOne
    @JoinColumn(name = "to_user_id")
    private User toUser;

    @ManyToOne
    @JoinColumn(name = "from_user_id")
    private User fromUser;

    @ManyToOne
    @JoinColumn(name = "mark_id")
    private Mark mark;

    @Min(0)
    @Max(5)
    @Column(nullable = false)
    private Integer weight;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    @Enumerated(EnumType.STRING)
    private Semester semester;

    @Column(name = "date")
    private LocalDateTime date;
}