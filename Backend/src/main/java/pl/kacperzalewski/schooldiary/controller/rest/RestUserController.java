package pl.kacperzalewski.schooldiary.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.kacperzalewski.schooldiary.dto.UserDTO;
import pl.kacperzalewski.schooldiary.entity.User;
import pl.kacperzalewski.schooldiary.entity.enums.UserRole;
import pl.kacperzalewski.schooldiary.exception.BadCredentialsException;
import pl.kacperzalewski.schooldiary.service.UserService;

import java.util.Set;

@RestController
public class RestUserController {

    private final UserService userService;

    @Autowired
    public RestUserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Handles GET Request to retrieve all users from the database.
     *
     * This endpoint retrieves a list of users. Optionally, users can be filtered based on their role if the `role` parameter is provided.
     *
     * @param role The role to filter users by. If not specified, all users are returned.
     *              This should be an enum representing the user roles (e.g., ADMIN, TEACHER, STUDENT).
     *              Example: "ADMIN"
     *
     * @return ResponseEntity containing:
     *      - A JSON array of {@link UserDTO} objects representing the users.
     *      - HTTP 401 Unauthorized if the credentials are invalid or unauthorized.
     *      - HTTP 500 Internal Server Error if there is an issue processing the request.
     *
     * @throws BadCredentialsException if the credentials are invalid or unauthorized.
     */
    @GetMapping("/api/users")
    @PreAuthorize("hasAnyAuthority('TEACHER', 'ADMIN')")
    public ResponseEntity<Set<UserDTO>> getUsers(@RequestParam(value = "role", required = false) UserRole role) {
        try {
            return ResponseEntity.ok(userService.getUsers(role));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Handles GET Request to retrieve user information based on user ID or the currently logged-in user.
     *
     * This endpoint retrieves user details. If a `userId` parameter is provided, it fetches the user with that ID.
     * If the `userId` parameter is not provided, it returns the details of the currently logged-in user.
     *
     * @param userId The ID of the user to retrieve. If not specified, details of the currently logged-in user are returned.
     *               Example: 123
     *
     * @return ResponseEntity containing:
     *      - A {@link UserDTO} object representing the user with fields such as ID, firstname, lastname, and role.
     *      - HTTP 401 Unauthorized if the user is not authenticated or credentials are invalid.
     *      - HTTP 404 Not Found if the user with the specified ID does not exist.
     *      - HTTP 500 Internal Server Error if there is an issue processing the request.
     *
     * @throws RuntimeException if there is an issue retrieving user details or credentials are invalid.
     */
    @GetMapping("/api/user")
    @PreAuthorize("#userId == null or principal.id == #userId or hasAnyAuthority('TEACHER', 'ADMIN')")
    public ResponseEntity<UserDTO> getUserById(@RequestParam(value = "userId", required = false) Long userId) {
        try {
            User user;

            if (userId != null) {
                user = userService.getUserById(userId);
                if (user == null) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                }
            } else {
                user = userService.getLoggedInUser();
            }

            return ResponseEntity.ok(UserDTO.fromEntity(user));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
