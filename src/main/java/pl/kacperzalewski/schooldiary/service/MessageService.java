package pl.kacperzalewski.schooldiary.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.kacperzalewski.schooldiary.dto.MessageDto;
import pl.kacperzalewski.schooldiary.entity.Message;
import pl.kacperzalewski.schooldiary.entity.MessageRecipient;
import pl.kacperzalewski.schooldiary.entity.News;
import pl.kacperzalewski.schooldiary.entity.enums.MessageStatus;
import pl.kacperzalewski.schooldiary.entity.enums.MessageType;
import pl.kacperzalewski.schooldiary.exception.UserNotFoundException;
import pl.kacperzalewski.schooldiary.repository.MessageRepository;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    private final UserService userService;

    private final NewsService newsService;

    @Autowired
    public MessageService(MessageRepository messageRepository, UserService userService, NewsService newsService) {
        this.messageRepository = messageRepository;
        this.userService = userService;
        this.newsService = newsService;
    }

    private Page<Message> filterMessagesByFilter(Long userId, String messagesFilter, Pageable pageable) {
        messagesFilter = messagesFilter.toUpperCase();

        Page<Message> messages;

        if (messagesFilter.equals("ARCHIVED")) {
            messages = messageRepository.findArchivedMessagesByRecipient(userId, pageable);
        } else {
            try {
                MessageStatus status = MessageStatus.valueOf(messagesFilter);
                messages = messageRepository.findMessagesByRecipient(userId, status, pageable);
            } catch (IllegalArgumentException e) {
                MessageType messageType = MessageType.valueOf(messagesFilter);
                messages = messageRepository.findMessagesByRecipient(userId, messageType, pageable);
            }
        }

        return messages;
    }

    public Page<MessageDto> getUserMessages(String messagesFilter, int page) throws UserNotFoundException {
        int size = 6;
        Pageable pageable = PageRequest.of(page - 1, size);
        Long userId = userService.getLoggedInUser().getId();

        Page<Message> messages = (messagesFilter == null) ? messageRepository.findMessagesByRecipient(userId, pageable) :
                filterMessagesByFilter(userId, messagesFilter, pageable);

        Page<MessageDto> messagesDto = messages.map(message -> {
            MessageRecipient recipient = message.getRecipients().stream().filter(r -> r.getRecipient().getId().equals(userId)).findFirst().get();
            MessageDto messageDto = new MessageDto();
            messageDto.setId(message.getId());
            messageDto.setDescription(message.getDescription());
            messageDto.setSender(message.getSender());
            messageDto.setType(message.getType());
            messageDto.setStatus(recipient.getMessageStatus());
            messageDto.setArchived(recipient.isArchived());
            messageDto.setDate(message.getDate());
            return messageDto;
        });

        return messagesDto;
    }

    public long getNewMessageCount() throws UserNotFoundException {
        return messageRepository.countMessagesByRecipientUserId(userService.getLoggedInUser().getId());
    }

    public void saveMessage(Message message) {
        message.getRecipients().forEach((messageRecipient) -> {
            News news = new News();
            news.setUser(messageRecipient.getRecipient());
            news.setHeader(message.getSender().getFirstname().substring(0, 1) + message.getSender().getLastname().substring(0,
                    1));
            news.setDescription("sent by " + message.getSender().getFirstname() + ' ' + message.getSender().getLastname());
            news.setTitle("Message");
            newsService.saveUserNews(news);
        });
        messageRepository.save(message);
    }
}