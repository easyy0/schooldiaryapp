package pl.kacperzalewski.schooldiary.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import pl.kacperzalewski.schooldiary.dto.UserDTO;
import pl.kacperzalewski.schooldiary.entity.*;
import pl.kacperzalewski.schooldiary.entity.enums.MessageStatus;
import pl.kacperzalewski.schooldiary.entity.enums.MessageType;
import pl.kacperzalewski.schooldiary.entity.enums.UserRole;
import pl.kacperzalewski.schooldiary.exception.UserNotFoundException;
import pl.kacperzalewski.schooldiary.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;

        User admin = new User();
        admin.setUsername("admin");
        admin.setFirstname("First");
        admin.setLastname("Admin");
        admin.setPassword(new BCryptPasswordEncoder().encode("admin"));
        admin.setRole(UserRole.ADMIN);
        userRepository.save(admin);
        System.out.println("USER SAVED!");

        User admin2 = new User();
        admin2.setUsername("admin2");
        admin2.setFirstname("Second");
        admin2.setLastname("Admin");
        admin2.setPassword(new BCryptPasswordEncoder().encode("admin"));
        admin2.setRole(UserRole.ADMIN);
        userRepository.save(admin2);
        System.out.println("USER SAVED!");

        User user2 = new User();
        user2.setUsername("teacher");
        user2.setPassword(new BCryptPasswordEncoder().encode("teacher"));
        user2.setFirstname("Yankens");
        user2.setLastname("Wattson");
        user2.setRole(UserRole.TEACHER);
        userRepository.save(user2);
        System.out.println("USER2 SAVED!");

        User teacher2 = new User();
        teacher2.setUsername("teacher2");
        teacher2.setPassword(new BCryptPasswordEncoder().encode("teacher"));
        teacher2.setFirstname("Emily");
        teacher2.setLastname("Martinez");
        teacher2.setRole(UserRole.TEACHER);
        userRepository.save(teacher2);
        System.out.println("USER2 SAVED!");

        User teacher3 = new User();
        teacher3.setUsername("teacher3");
        teacher3.setPassword(new BCryptPasswordEncoder().encode("teacher"));
        teacher3.setFirstname("Rachel");
        teacher3.setLastname("Davis");
        teacher3.setRole(UserRole.TEACHER);
        userRepository.save(teacher3);
        System.out.println("USER2 SAVED!");

        User teacher4 = new User();
        teacher4.setUsername("teacher4");
        teacher4.setPassword(new BCryptPasswordEncoder().encode("teacher"));
        teacher4.setFirstname("Mark");
        teacher4.setLastname("Johnson");
        teacher4.setRole(UserRole.TEACHER);
        userRepository.save(teacher4);
        System.out.println("USER2 SAVED!");

        User user3 = new User();
        user3.setUsername("student");
        user3.setPassword(new BCryptPasswordEncoder().encode("student"));
        user3.setFirstname("Kevin");
        user3.setLastname("Haas");
        user3.setRole(UserRole.STUDENT);
        userRepository.save(user3);
        System.out.println("USER3 SAVED!");
    }

    public CustomUserDetails getLoggedInUser() throws UserNotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return (CustomUserDetails) authentication.getPrincipal();
        }
        throw new UserNotFoundException("User not found");
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User getUserById(int userId) {
        return userRepository.findById(userId);
    }

    public Set<UserDTO> getUsers(UserRole role) throws UserNotFoundException {
        if (role == null) {
            Iterable<User> allUsers = userRepository.findAll();

            return StreamSupport.stream(allUsers.spliterator(), false).map(user -> {
                UserDTO userDTO = new UserDTO();
                userDTO.setId(user.getId());
                userDTO.setFirstname(user.getFirstname());
                userDTO.setLastname(user.getLastname());
                userDTO.setRole(user.getRole());
                return userDTO;
            }).collect(Collectors.toSet());
        } else {
            return userRepository.findByRolesNotContaining(getLoggedInUser().getId(), role).stream().map(user -> {
                UserDTO userDTO = new UserDTO();
                userDTO.setId(user.getId());
                userDTO.setFirstname(user.getFirstname());
                userDTO.setLastname(user.getLastname());
                userDTO.setRole(user.getRole());
                return userDTO;
            }).collect(Collectors.toSet());
        }
    }
}