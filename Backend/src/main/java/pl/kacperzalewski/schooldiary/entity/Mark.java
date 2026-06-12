package pl.kacperzalewski.schooldiary.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(
    name = "mark",
    uniqueConstraints = {
            @UniqueConstraint(columnNames = "code")
    }
)
@Data
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Mark {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, length = 50)
    private String code;

    @Column(nullable = false, length = 10)
    private String symbol;

    @Column(nullable = false, precision = 3, scale = 1)
    private BigDecimal numericValue;
}