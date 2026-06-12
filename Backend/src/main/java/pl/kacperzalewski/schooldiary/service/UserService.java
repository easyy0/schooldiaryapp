package pl.kacperzalewski.schooldiary.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.kacperzalewski.schooldiary.dto.UserDTO;
import pl.kacperzalewski.schooldiary.entity.CustomUserDetails;
import pl.kacperzalewski.schooldiary.entity.User;
import pl.kacperzalewski.schooldiary.entity.enums.UserRole;
import pl.kacperzalewski.schooldiary.exception.BadCredentialsException;
import pl.kacperzalewski.schooldiary.repository.SchoolClassRepository;
import pl.kacperzalewski.schooldiary.repository.TimetableRepository;
import pl.kacperzalewski.schooldiary.repository.UserRepository;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository, SchoolClassRepository schoolClassRepository, TimetableRepository timetableRepository) {
        this.userRepository = userRepository;
    }

    public Long getLoggedInUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && auth.getPrincipal() instanceof CustomUserDetails cud) {
            return cud.getId();
        }
        throw new BadCredentialsException("User not found");
    }

    /**
     * Retrieves the currently logged-in user's details from the security context.
     * If the authentication is valid and the user is authenticated, the method returns
     * a {@link CustomUserDetails} object representing the authenticated user.
     *
     * @return {@link CustomUserDetails} representing the currently logged-in user.
     * @throws BadCredentialsException if no authenticated user is found or the authentication is invalid.
     */
    @Transactional
    public User getLoggedInUser() throws BadCredentialsException {
        Long id = getLoggedInUserId();
        return userRepository.findByIdWithClassAndSubjects(id)
                .orElseThrow(() -> new BadCredentialsException("User not found"));
    }

    /**
     * Retrieves a {@link User} based on the specified userId.
     *
     * @param userId The id of the user to retrieve from the database.
     * @return The {@link User} associated with the given userId.
     */
    @Transactional
    public User getUserById(long userId) {
        return userRepository.findByIdWithClassAndSubjects(userId).orElse(null);
    }

    /**
     * Retrieves a set of {@link UserDTO} based on the specified {@link UserRole}.
     * If no role is provided, retrieves all users in the system.
     * If a role is provided, retrieves all users whose role does not match the specified role,
     * excluding the currently logged-in user.
     *
     * @param role The {@link UserRole} to filter users by. If null, all users are returned.
     * @return A set of {@link UserDTO} objects, representing users in the system.
     * @throws BadCredentialsException if the credentials of the logged-in user are invalid.
     */
    public Set<UserDTO> getUsers(UserRole role) throws BadCredentialsException {
        if (role == null) {
            return userRepository.findAllWithSchoolClass()
                    .stream()
                    .map(UserDTO::fromEntity)
                    .collect(Collectors.toSet());
        } else {
            return userRepository.findByRolesNotContainingWithSchoolClass(getLoggedInUser().getId(), role)
                    .stream()
                    .map(UserDTO::fromEntity)
                    .collect(Collectors.toSet());
        }
    }
}
