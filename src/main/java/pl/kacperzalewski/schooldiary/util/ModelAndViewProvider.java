package pl.kacperzalewski.schooldiary.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import pl.kacperzalewski.schooldiary.entity.CustomUserDetails;
import pl.kacperzalewski.schooldiary.exception.UserNotFoundException;
import pl.kacperzalewski.schooldiary.service.MessageService;
import pl.kacperzalewski.schooldiary.service.UserService;

import java.util.Set;

@Component
@Scope("singleton")
public class ModelAndViewProvider {

    private final UserService userService;

    private final MessageService messageService;

    @Autowired
    public ModelAndViewProvider(UserService userService, MessageService messageService) {
        this.userService = userService;
        this.messageService = messageService;
    }

    public ModelAndView setupMavGlobalData(String viewName) {
        try {
            ModelAndView mav = new ModelAndView(viewName);
            CustomUserDetails user = userService.getLoggedInUser();
            Set<String> userRoles = UserUtils.getRolesAsString(user);
            mav.addObject("user_roles", userRoles);
            mav.addObject("msgCount", messageService.getNewMessageCount());
            return mav;
        } catch (UserNotFoundException e) {
            return null;
        }
    }
}
