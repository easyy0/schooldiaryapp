package pl.kacperzalewski.schooldiary.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.kacperzalewski.schooldiary.entity.Message;
import pl.kacperzalewski.schooldiary.entity.News;
import pl.kacperzalewski.schooldiary.entity.enums.MessageStatus;
import pl.kacperzalewski.schooldiary.entity.enums.MessageType;
import pl.kacperzalewski.schooldiary.exception.UserNotFoundException;
import pl.kacperzalewski.schooldiary.repository.MessageRepository;

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

        try {
            MessageStatus status = MessageStatus.valueOf(messagesFilter);
            return messageRepository.findMessagesByRecipient(userId, status, pageable);
        } catch (IllegalArgumentException e) {
            MessageType messageType = MessageType.valueOf(messagesFilter);
            return messageRepository.findMessagesByRecipient(userId, messageType, pageable);
        }
    }

    public Page<Message> getUserMessages(String messagesFilter, int page) throws UserNotFoundException {
        int size = 6;
        Pageable pageable = PageRequest.of(page - 1, size);
        Long userId = userService.getLoggedInUser().getId();

        return (messagesFilter == null) ? messageRepository.findMessagesByRecipient(userId, pageable) : filterMessagesByFilter(userId, messagesFilter, pageable);
    }

    public long getNewMessageCount() throws UserNotFoundException {
        return messageRepository.countMessagesByRecipientId(userService.getLoggedInUser().getId());
    }

    public Message saveMessage(Message message) {
        message.getRecipients().forEach((user) -> {
            News news = new News();
            news.setUser(user);
            news.setHeader(message.getSender().getFirstname().substring(0, 1) + message.getSender().getLastname().substring(0,
                    1));
            news.setDescription("sent by " + message.getSender().getFirstname() + ' ' + message.getSender().getLastname());
            news.setTitle("Message");
            newsService.saveUserNews(news);
        });
        return messageRepository.save(message);
    }
}