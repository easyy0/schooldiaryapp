package pl.kacperzalewski.schooldiary.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import pl.kacperzalewski.schooldiary.entity.CustomUserDetails;
import pl.kacperzalewski.schooldiary.entity.User;
import pl.kacperzalewski.schooldiary.exception.BadCredentialsException;
import pl.kacperzalewski.schooldiary.service.Message.MessageService;
import pl.kacperzalewski.schooldiary.service.UserService;

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
            User user = userService.getLoggedInUser();
            String userRole = UserUtils.getRolesAsString(user);
            mav.addObject("user_role", userRole);
            mav.addObject("msgCount", messageService.getUnreadMessageCount());
            return mav;
        } catch (BadCredentialsException e) {
            return null;
        }
    }
}
