    package pl.kacperzalewski.schooldiary.entity;

    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.NoArgsConstructor;
    import lombok.ToString;
    import pl.kacperzalewski.schooldiary.entity.enums.MessageStatus;
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

        private String description;

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

        private LocalDateTime date;
    }