package pl.kacperzalewski.schooldiary.service.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.kacperzalewski.schooldiary.entity.Message;
import pl.kacperzalewski.schooldiary.entity.enums.MessageStatus;
import pl.kacperzalewski.schooldiary.entity.enums.MessageType;
import pl.kacperzalewski.schooldiary.exception.InvalidFilterException;
import pl.kacperzalewski.schooldiary.repository.MessageRepository;

@Service
public class MessageFilterService {

    private final MessageRepository messageRepository;

    @Autowired
    public MessageFilterService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    private Page<Message> findArchivedMessages(Long userId, Pageable pageable, String searchParam) {
        return messageRepository.findArchivedMessagesByRecipientAndFilterByTitle(userId, pageable, searchParam);
    }

    private Page<Message> findMessagesByStatus(Long userId, MessageStatus status, Pageable pageable, String searchParam) {
        return messageRepository.findMessagesByRecipient(userId, status, pageable, searchParam);
    }

    private Page<Message> findMessagesByType(Long userId, MessageType messageType, Pageable pageable, String searchParam) {
        return messageRepository.findMessagesByRecipient(userId, messageType, pageable, searchParam);
    }

    private Object resolveFilter(String filter) {
        try {
            return MessageStatus.valueOf(filter);
        } catch (IllegalArgumentException e) {
            try {
                return MessageType.valueOf(filter);
            } catch (IllegalArgumentException ex) {
                throw new InvalidFilterException("Invalid message filter: " + filter);
            }
        }
    }

    public Page<Message> filterMessagesByFilterAndTitle(Long userId, String messagesFilter, Pageable pageable, String searchParam) {
        messagesFilter = messagesFilter.toUpperCase();

        if (messagesFilter.equals("ARCHIVED")) {
            return findArchivedMessages(userId, pageable, searchParam);
        }

        Object filter = resolveFilter(messagesFilter);

        if (filter instanceof MessageStatus) {
            return findMessagesByStatus(userId, (MessageStatus) filter, pageable, searchParam);
        } else if (filter instanceof MessageType) {
            return findMessagesByType(userId, (MessageType) filter, pageable, searchParam);
        }

        return null;
    }

    public Page<Message> retrieveMessagesBasedOnFilterAndSearchQuery(
            Long userId,
            String messagesFilter,
            Pageable pageable,
            String searchParam
    ) {
        return (messagesFilter.equals("all"))
                ? messageRepository.findMessagesByRecipientAndFilterByTitle(userId, pageable, searchParam)
                : filterMessagesByFilterAndTitle(userId, messagesFilter, pageable, searchParam);
    }
}
