package pl.kacperzalewski.schooldiary.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;
import pl.kacperzalewski.schooldiary.exception.UserNotFoundException;
import pl.kacperzalewski.schooldiary.service.MessageService;
import pl.kacperzalewski.schooldiary.util.ModelAndViewProvider;

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
        return modelAndViewProvider.setupMavGlobalData("messages");
    }
}