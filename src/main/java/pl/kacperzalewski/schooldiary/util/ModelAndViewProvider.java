package pl.kacperzalewski.schooldiary.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import pl.kacperzalewski.schooldiary.entity.CustomUserDetails;
import pl.kacperzalewski.schooldiary.exception.UserNotFoundException;
import pl.kacperzalewski.schooldiary.repository.NewsRepository;
import pl.kacperzalewski.schooldiary.service.UserService;

import java.util.Set;

@Component
@Scope("singleton")
public class ModelAndViewProvider {

    private UserService userService;

    @Autowired
    public ModelAndViewProvider(UserService userService) {
        this.userService = userService;
    }

    public ModelAndView setupMavGlobalData(String viewName) {
        try {
            ModelAndView mav = new ModelAndView(viewName);
            CustomUserDetails user = userService.getLoggedInUser();
            Set<String> userRoles = UserUtils.getRolesAsString(user);
            mav.addObject("user_roles", userRoles);
            return mav;
        } catch (UserNotFoundException e) {
            return null;
        }
    }
}
