package pl.kacperzalewski.schooldiary.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.kacperzalewski.schooldiary.entity.Message;
import pl.kacperzalewski.schooldiary.entity.News;
import pl.kacperzalewski.schooldiary.exception.UserNotFoundException;
import pl.kacperzalewski.schooldiary.repository.MessageRepository;
import pl.kacperzalewski.schooldiary.repository.NewsRepository;

import java.util.Set;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    private final UserService userService;

    @Autowired
    public MessageService(MessageRepository messageRepository, UserService userService) {
        this.messageRepository = messageRepository;
        this.userService = userService;
    }

    public Set<Message> getUserMessages() throws UserNotFoundException {
        return messageRepository.findMessagesByRecipient(userService.getLoggedInUser().getId());
    }
}