package pl.kacperzalewski.schooldiary.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import pl.kacperzalewski.schooldiary.entity.Message;

import java.util.Set;

public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT m FROM Message m JOIN m.recipients r WHERE r.id = :userId")
    Set<Message> findMessagesByRecipient(Long userId);
}
