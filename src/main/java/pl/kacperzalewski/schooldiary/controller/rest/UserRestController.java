package pl.kacperzalewski.schooldiary.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RestController;
import pl.kacperzalewski.schooldiary.entity.Message;
import pl.kacperzalewski.schooldiary.entity.MessageRecipient;
import pl.kacperzalewski.schooldiary.entity.User;
import pl.kacperzalewski.schooldiary.entity.UserRole;
import pl.kacperzalewski.schooldiary.entity.enums.MessageStatus;
import pl.kacperzalewski.schooldiary.entity.enums.MessageType;
import pl.kacperzalewski.schooldiary.repository.UserRepository;
import pl.kacperzalewski.schooldiary.service.MessageService;

import java.time.LocalDateTime;
import java.util.Set;

@RestController
public class UserRestController {

    private final UserRepository userRepository;

    private final MessageService messageService;

    @Autowired
    public UserRestController(UserRepository userRepository, MessageService messageService) {
        System.out.println("STARTING");
        this.userRepository = userRepository;
        this.messageService = messageService;

        User user = new User();
        user.setUsername("admin");
        user.setPassword(new BCryptPasswordEncoder().encode("admin"));
        UserRole userRole = new UserRole();
        userRole.setName("ADMIN");
        user.setRoles(Set.of(userRole));
        userRepository.save(user);
        System.out.println("USER SAVED!");

        User user2 = new User();
        user2.setUsername("teacher");
        user2.setPassword(new BCryptPasswordEncoder().encode("teacher"));
        user2.setFirstname("Yankens");
        user2.setLastname("Wattson");
        UserRole userRole2 = new UserRole();
        userRole2.setName("TEACHER");
        user2.setRoles(Set.of(userRole2));
        userRepository.save(user2);
        System.out.println("USER2 SAVED!");

        User user3 = new User();
        user3.setUsername("student");
        user3.setPassword(new BCryptPasswordEncoder().encode("student"));
        UserRole userRole3 = new UserRole();
        userRole3.setName("STUDENT");
        user3.setRoles(Set.of(userRole3));
        userRepository.save(user3);
        System.out.println("USER3 SAVED!");

        for (int i = 0; i < 10; i++) {
            MessageRecipient messageRecipient = new MessageRecipient();
            messageRecipient.setRecipient(user3);
            messageRecipient.setMessageStatus(MessageStatus.UNREADEN);
            Message message = new Message();
            message.setSender(user2);
            message.setRecipients(Set.of(messageRecipient));
            message.setType(MessageType.DEFAULT);
            message.setDescription("Admin message generated automatically with account creation, please do not reply");
            message.setDate(LocalDateTime.now());
            messageService.saveMessage(message);
        }

        for (int i = 0; i < 10; i++) {
            MessageRecipient messageRecipient = new MessageRecipient();
            messageRecipient.setRecipient(user3);
            messageRecipient.setMessageStatus(MessageStatus.UNREADEN);
            Message message = new Message();
            message.setSender(user2);
            message.setRecipients(Set.of(messageRecipient));
            message.setType(MessageType.IMPORTANT);
            message.setDescription("Admin message generated automatically with account creation, please do not reply");
            message.setDate(LocalDateTime.now());
            messageService.saveMessage(message);
        }

        for (int i = 0; i < 10; i++) {
            MessageRecipient messageRecipient = new MessageRecipient();
            messageRecipient.setRecipient(user3);
            messageRecipient.setMessageStatus(MessageStatus.READEN);
            Message message = new Message();
            message.setSender(user2);
            message.setRecipients(Set.of(messageRecipient));
            message.setType(MessageType.DEFAULT);
            message.setDescription("Admin message generated automatically with account creation, please do not reply");
            message.setDate(LocalDateTime.now());
            messageService.saveMessage(message);
        }

        for (int i = 0; i < 10; i++) {
            MessageRecipient messageRecipient = new MessageRecipient();
            messageRecipient.setRecipient(user3);
            messageRecipient.setMessageStatus(MessageStatus.READEN);
            Message message = new Message();
            message.setSender(user2);
            message.setRecipients(Set.of(messageRecipient));
            message.setType(MessageType.IMPORTANT);
            message.setDescription("Admin message generated automatically with account creation, please do not reply");
            message.setDate(LocalDateTime.now());
            messageService.saveMessage(message);
        }

//        for (int i = 0; i < 10; i++) {
//            MessageRecipient messageRecipient = new MessageRecipient();
//            messageRecipient.setRecipient(user3);
//            messageRecipient.setMessageStatus(MessageStatus.UNREADEN);
//            messageRecipient.setArchived(true);
//            Message message = new Message();
//            message.setSender(user2);
//            message.setRecipients(Set.of(messageRecipient));
//            message.setType(MessageType.DEFAULT);
//            message.setDescription("Example of archived messages");
//            message.setDate(LocalDateTime.now());
//            messageService.saveMessage(message);
//        }

        for (int i = 0; i < 3; i++) {
            MessageRecipient messageRecipient = new MessageRecipient();
            messageRecipient.setRecipient(user3);
            messageRecipient.setMessageStatus(MessageStatus.READEN);
            Message message = new Message();
            message.setSender(user2);
            message.setRecipients(Set.of(messageRecipient));
            message.setType(MessageType.SENT);
            message.setDescription("Message sent by me");
            message.setDate(LocalDateTime.now());
            messageService.saveMessage(message);
        }
    }
}
