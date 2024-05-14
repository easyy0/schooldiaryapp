package pl.kacperzalewski.schooldiary.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import pl.kacperzalewski.schooldiary.entity.enums.MessageType;

import java.time.LocalDateTime;
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

    private String title;

    private String description;

    @ManyToOne
    @JoinColumn(name = "senderId")
    private User sender;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "message_recipients_connector",
            joinColumns = @JoinColumn(name = "messageId"),
            inverseJoinColumns = @JoinColumn(name = "messageRecipientId")
    )
    private Set<MessageRecipient> recipients;

    @Enumerated(EnumType.STRING)
    private MessageType type;

    private LocalDateTime date;
}