package pl.kacperzalewski.schooldiary.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.kacperzalewski.schooldiary.entity.Message;
import pl.kacperzalewski.schooldiary.entity.User;
import pl.kacperzalewski.schooldiary.entity.UserRole;
import pl.kacperzalewski.schooldiary.entity.enums.MessageStatus;
import pl.kacperzalewski.schooldiary.entity.enums.MessageType;
import pl.kacperzalewski.schooldiary.repository.MessageRepository;
import pl.kacperzalewski.schooldiary.repository.UserRepository;
import pl.kacperzalewski.schooldiary.service.MessageService;

import java.util.Date;
import java.util.Set;

@RestController
public class UserRestController {

    private final UserRepository userRepository;

    private final MessageRepository messageRepository;

    @Autowired
    public UserRestController(UserRepository userRepository, MessageRepository messageRepository) {
        this.userRepository = userRepository;
        this.messageRepository = messageRepository;
    }

    @GetMapping("/test/addUser")
    public void addUser() {
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

        Message message = new Message();
        message.setSender(user2);
        message.setRecipients(Set.of(user3));
        message.setType(MessageType.IMPORTANT);
        message.setStatus(MessageStatus.UNREADEN);
        message.setDate(new Date());
        messageRepository.save(message);
    }
}
