package pl.kacperzalewski.schooldiary.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;
import pl.kacperzalewski.schooldiary.entity.CustomUserDetails;
import pl.kacperzalewski.schooldiary.entity.Message;
import pl.kacperzalewski.schooldiary.exception.UserNotFoundException;
import pl.kacperzalewski.schooldiary.repository.NewsRepository;
import pl.kacperzalewski.schooldiary.service.MessageService;
import pl.kacperzalewski.schooldiary.service.UserService;
import pl.kacperzalewski.schooldiary.util.ModelAndViewProvider;
import pl.kacperzalewski.schooldiary.util.UserUtils;

import java.util.Set;

@Controller
public class MessageController {


    private final ModelAndViewProvider modelAndViewProvider;

    private final MessageService messageService;

    @Autowired
    public MessageController(ModelAndViewProvider modelAndViewProvider, MessageService messageService) {
        this.modelAndViewProvider = modelAndViewProvider;
        this.messageService = messageService;
    }

    @GetMapping("/messages")
    public ModelAndView messages() throws UserNotFoundException {
        ModelAndView mav = modelAndViewProvider.setupMavGlobalData("messages");
        System.out.println(messageService.getUserMessages());
        mav.addObject("messages", messageService.getUserMessages());
        return mav;
    }
}