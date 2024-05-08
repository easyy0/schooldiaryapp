package pl.kacperzalewski.schooldiary.entity;

import jakarta.persistence.*;
import lombok.*;
import pl.kacperzalewski.schooldiary.entity.enums.MessageStatus;

@Entity
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "message_recipients")
public class MessageRecipient {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User recipient;

    @Enumerated(EnumType.STRING)
    private MessageStatus messageStatus;

    private boolean isArchived;
}