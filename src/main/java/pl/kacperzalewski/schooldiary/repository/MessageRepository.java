package pl.kacperzalewski.schooldiary.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.kacperzalewski.schooldiary.entity.Message;
import pl.kacperzalewski.schooldiary.entity.enums.MessageStatus;
import pl.kacperzalewski.schooldiary.entity.enums.MessageType;

public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT COUNT(m) FROM Message m JOIN m.recipients r where r.id = :userId AND m.status = 'UNREADEN'")
    long countMessagesByRecipientId(Long userId);

    @Query("SELECT m FROM Message m JOIN m.recipients r WHERE r.id = :userId AND m.type NOT IN ('ARCHIVED', 'SENT') " +
            "ORDER BY m.date ASC")
    Page<Message> findMessagesByRecipient(Long userId, Pageable pageable);

    @Query("SELECT m FROM Message m JOIN m.recipients r WHERE r.id = :userId AND m.status = :messageStatus AND m.type NOT IN ('ARCHIVED', 'SENT') ORDER BY " +
            "m.date ASC")
    Page<Message> findMessagesByRecipient(Long userId, MessageStatus messageStatus, Pageable pageable);

    @Query("SELECT m FROM Message m JOIN m.recipients r WHERE r.id = :userId AND m.type = :messageType ORDER BY m.date ASC")
    Page<Message> findMessagesByRecipient(Long userId, MessageType messageType, Pageable pageable);
}
