package pl.kacperzalewski.schooldiary.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.kacperzalewski.schooldiary.exception.UserNotFoundException;
import pl.kacperzalewski.schooldiary.entity.CustomUserDetails;

@Service
public class UserService {

    public CustomUserDetails getLoggedInUser() throws UserNotFoundException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return (CustomUserDetails) authentication.getPrincipal();
        }
        throw new UserNotFoundException("User not found");
    }
}