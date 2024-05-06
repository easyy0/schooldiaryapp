package pl.kacperzalewski.schooldiary.entity;

import jakarta.persistence.*;
import lombok.*;
import pl.kacperzalewski.schooldiary.entity.enums.MessageStatus;
import pl.kacperzalewski.schooldiary.entity.enums.MessageType;

import java.util.Date;
import java.util.Set;

@Entity
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "senderId")
    private User sender;

    @ManyToMany
    @JoinTable(
            name = "message_recipients",
            joinColumns = @JoinColumn(name = "messageId"),
            inverseJoinColumns = @JoinColumn(name = "userId")
    )
    private Set<User> recipients;

    @Enumerated(EnumType.STRING)
    private MessageType type;

    @Enumerated(EnumType.STRING)
    private MessageStatus status;

    @Temporal(TemporalType.DATE)
    private Date date;

    @OneToMany
    private Set<Message> replies;
}