package pl.kacperzalewski.schooldiary.controller.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import pl.kacperzalewski.schooldiary.dto.MessageFormDTO;
import pl.kacperzalewski.schooldiary.exception.UserNotFoundException;
import pl.kacperzalewski.schooldiary.service.MessageService;

import java.util.List;

@RestController
public class RestMessageController {

    private final MessageService messageService;

    @Autowired
    public RestMessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/api/messages")
    public ResponseEntity<?> getMessages(@RequestParam(required = false) String messagesFilter, Integer page) {
        try {
            return ResponseEntity.ok(messageService.getUserMessages(messagesFilter, page));
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/api/messages-read")
    public ResponseEntity<?> getMessageFromId(@RequestParam("messageId") long messageId) {
        try {
            return ResponseEntity.ok(List.of( messageService.updateMessage(messageId, "read"), messageService.getMessageById(messageId)));
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/api/messages-count")
    public ResponseEntity<?> getNewMessagesCount() {
        try {
            return ResponseEntity.ok(messageService.getNewMessageCount());
        } catch (UserNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/api/messages")
    public ResponseEntity<?> updateMessage(@RequestParam long messageId, @RequestParam String method) {
        try {
            return ResponseEntity.ok(messageService.updateMessage(messageId, method));
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping("/api/messages")
    public ResponseEntity<?> addMessage(@RequestBody MessageFormDTO messageFormDTO) {
        try {
            messageService.saveMessageForm(messageFormDTO);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}