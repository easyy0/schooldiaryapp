package pl.kacperzalewski.schooldiary.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import pl.kacperzalewski.schooldiary.entity.CustomUserDetails;
import pl.kacperzalewski.schooldiary.entity.User;
import pl.kacperzalewski.schooldiary.repository.UserRepository;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Loads the user details by the provided username.
     * This method retrieves a {@link CustomUserDetails} object for the user if the username exists in the database.
     *
     * @param username The username of the user to load.
     * @return A {@link CustomUserDetails} object containing user information for authentication.
     * @throws UsernameNotFoundException if the username is not found in the database.
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByUsername(username);
        if(user != null){
            return new CustomUserDetails(user);
        }
        throw new UsernameNotFoundException("Username not found");
    }
}