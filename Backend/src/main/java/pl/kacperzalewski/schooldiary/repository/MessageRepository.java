package pl.kacperzalewski.schooldiary.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.kacperzalewski.schooldiary.entity.Message;
import pl.kacperzalewski.schooldiary.entity.enums.MessageStatus;
import pl.kacperzalewski.schooldiary.entity.enums.MessageType;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT COUNT(m) FROM Message m JOIN m.recipients r where r.recipient.id = :userId AND r.messageStatus = " +
            "'UNREAD' AND r.isArchived = FALSE AND r.isDeleted = FALSE")
    long countUnreadenMessagesByUserId(Long userId);

    @Query("SELECT m FROM Message m JOIN m.recipients r WHERE m.id = :id AND r.recipient.id = :userId AND r.isDeleted" +
            " = " +
            "FALSE")
    Message findMessageByIdAndRecipientsRecipientId(Long id, Long userId);

    @Query("SELECT m FROM Message m " +
            "JOIN m.recipients r " +
            "WHERE r.recipient.id = :userId " +
            "AND r.messageStatus != 'SENT' " +
            "AND r.isArchived = FALSE " +
            "AND r.isDeleted = FALSE " +
            "AND UPPER(m.title) LIKE UPPER(CONCAT('%', :searchParam, '%')) " +
            "ORDER BY m.date DESC")
    Page<Message> findMessagesByRecipientAndFilterByTitle(
            Long userId,
            Pageable pageable,
            String searchParam
    );

    @Query("SELECT m FROM Message m " +
            "JOIN m.recipients r " +
            "WHERE r.recipient.id = :userId " +
            "AND r.isArchived = TRUE " +
            "AND r.isDeleted = FALSE " +
            "AND LOWER(m.title) LIKE LOWER(CONCAT('%', :searchParam, '%')) " +
            "ORDER BY m.date DESC")
    Page<Message> findArchivedMessagesByRecipientAndFilterByTitle(
            Long userId,
            Pageable pageable,
            String searchParam
    );

    @Query("SELECT m FROM Message m " +
            "JOIN m.recipients r " +
            "WHERE r.recipient.id = :userId " +
            "AND r.messageStatus = :messageStatus " +
            "AND r.isArchived = FALSE " +
            "AND r.isDeleted = FALSE " +
            "AND LOWER(m.title) LIKE LOWER(CONCAT('%', :searchParam, '%')) " +
            "ORDER BY m.date DESC")
    Page<Message> findMessagesByRecipient(Long userId, MessageStatus messageStatus, Pageable pageable, String searchParam);

   @Query("SELECT m FROM Message m " +
           "JOIN m.recipients r " +
           "WHERE r.recipient.id = :userId " +
           "AND m.type = :messageType " +
           "AND r.isArchived = FALSE " +
           "AND r.isDeleted = FALSE " +
           "AND LOWER(m.title) LIKE LOWER(CONCAT('%', :searchParam, '%')) " +
           "ORDER BY m.date DESC")
   Page<Message> findMessagesByRecipient(Long userId, MessageType messageType, Pageable pageable, String searchParam);
}