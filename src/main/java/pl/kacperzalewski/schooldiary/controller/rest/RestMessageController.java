package pl.kacperzalewski.schooldiary.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.kacperzalewski.schooldiary.dto.MessageDto;
import pl.kacperzalewski.schooldiary.dto.MessageFormDTO;
import pl.kacperzalewski.schooldiary.exception.UserNotFoundException;
import pl.kacperzalewski.schooldiary.service.MessageService;

@RestController
public class RestMessageController {

    private final MessageService messageService;

    @Autowired
    public RestMessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/api/messages")
    public Page<MessageDto> getMessages(@RequestParam(required = false) String messagesFilter,
                                        @RequestParam(required = false) Integer page) {
        try {
            return messageService.getUserMessages(messagesFilter, page);
        } catch (UserNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @PatchMapping("/api/messages")
    public ResponseEntity<?> updateMessage(@RequestParam long messageId, @RequestParam String method) {
        try {
            messageService.updateMessage(messageId, method);
            return ResponseEntity.ok().build();
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }
}