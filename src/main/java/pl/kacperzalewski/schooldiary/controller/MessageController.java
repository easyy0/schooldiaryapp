package pl.kacperzalewski.schooldiary.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;
import pl.kacperzalewski.schooldiary.dto.MessageFormDTO;
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
    public ModelAndView getMessagesMAV() throws UserNotFoundException {
        return modelAndViewProvider.setupMavGlobalData("messages");
    }

    @GetMapping("/messages/write")
    public ModelAndView getWriteMessageMAV() throws UserNotFoundException {
        return modelAndViewProvider.setupMavGlobalData("messageswrite");
    }

    @PostMapping("/api/messages")
    public RedirectView addMessage(@ModelAttribute MessageFormDTO messageFormDTO) throws UserNotFoundException {
        messageService.saveMessageForm(messageFormDTO);
        return new RedirectView("/messages");
    }
}