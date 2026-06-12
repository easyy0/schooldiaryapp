package pl.kacperzalewski.schooldiary.controller.rest;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.kacperzalewski.schooldiary.dto.MessageDescriptionDto;
import pl.kacperzalewski.schooldiary.dto.MessageFormDTO;
import pl.kacperzalewski.schooldiary.dto.MessageUpdateDTO;
import pl.kacperzalewski.schooldiary.exception.BadCredentialsException;
import pl.kacperzalewski.schooldiary.service.Message.MessageService;

import java.util.List;

@RestController
public class RestMessageController {

    private final MessageService messageService;

    @Autowired
    public RestMessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    /**
     * Handles GET Request to gather user messages with specified filter and title, including an optional search parameter.
     *
     * This endpoint retrieves a paginated list of messages. Messages can be filtered based on the provided filter criteria and
     * optionally searched by title if a search parameter is provided.
     *
     * @param messagesFilter Used to define which messages should be gathered from the database (e.g., "unread", "important").
     * @param searchParam If provided, filters messages to include only those containing this parameter in the message title.
     * @param page The page number of messages to be returned, starting from 0. If not provided, defaults to the first page.
     *
     * @return ResponseEntity containing:
     *      - A paginated list of messages if found.
     *      - HTTP 404 Not Found if no messages are found.
     *
     * @throws BadCredentialsException if the provided credentials are invalid.
     */
    @GetMapping("/api/messages")
    public ResponseEntity<?> getUserMessages(@RequestParam(required = false) String messagesFilter,
                                          @RequestParam(required = false) String searchParam,
                                          @RequestParam(defaultValue = "1") int page) {
        try {
            return ResponseEntity.ok(messageService.getUserMessages(messagesFilter, page, searchParam));
        } catch (BadCredentialsException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Handles GET Request to gather the description of a message based on the specified messageId.
     *
     * This endpoint updates the message status to READ if it was previously UNREAD.
     *
     * @param messageId The ID of the message to retrieve and update.
     *
     * @return ResponseEntity containing:
     *      - A JSON array with two elements:
     *        1. A boolean indicating if the message status was changed to READ.
     *        2. The description of the message.
     *      - HTTP 404 Not Found if the message with the given ID does not exist or if there is an issue with the request.
     *
     * @throws BadCredentialsException if the credentials are invalid or unauthorized.
     */
    @GetMapping("/api/messages-read")
    public ResponseEntity<?> updateMessageStatusAndGetDescription(@RequestParam("messageId") long messageId) {
        try {
            MessageUpdateDTO messageUpdateDTO = new MessageUpdateDTO(new long[]{messageId}, "READ");
            int messagesAffected = messageService.updateMessages(messageUpdateDTO);

            MessageDescriptionDto messageDescription = messageService.getMessageDescriptionById(messageId);
            return ResponseEntity.ok(List.of(messagesAffected, messageDescription));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    /**
     * Handles GET Request to gather the count of unread messages.
     *
     * This endpoint returns the total number of unread messages for the authenticated user.
     *
     * @return ResponseEntity containing:
     *      - A JSON object with a single field "count" representing the number of unread messages.
     *      - HTTP 401 Unauthorized if the credentials are invalid or unauthorized.
     *
     * @throws BadCredentialsException if the credentials are invalid or unauthorized.
     */
    @GetMapping("/api/unread-messages-count")
    public ResponseEntity<?> getUnreadMessagesCount() {
        try {
            return ResponseEntity.ok(messageService.getUnreadMessageCount());
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    /**
     * Handles PATCH Request to update message depends on the update method
     *
     * This endpoint updates the specified method based on the messageId
     *
     * @param messageUpdateDTO A DTO containing the messageIds and method required to update message.
     *                         Example:
     *                         {
     *                            "messageIds": [1,2,3,4],
     *                            "method": "read"
     *                         }
     *
     * @return ResponseEntity containing:
     *      - A JSON object with a single field "messageAffected" representing the number of affected messages.
     *      - HTTP 401 Unauthorized if the credentials are invalid or unauthorized.
     *
     * @throws BadCredentialsException if the credentials are invalid or unauthorized.
     */
    @PatchMapping("/api/messages")
    public ResponseEntity<?> updateMessage(@Valid @RequestBody MessageUpdateDTO messageUpdateDTO) {
        try {
            return ResponseEntity.ok(messageService.updateMessages(messageUpdateDTO));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    /**
     * Handles POST Request to save a new message with the specified body.
     *
     * This endpoint saves a message provided in the request body. The message is saved to the database
     * and no content is returned in the response body upon successful save.
     *
     * @param messageFormDTO A DTO (Data Transfer Object) containing the details of the message to be saved.
     *                       Example:
     *                       {
     *                          "receivers": [1,2,3,4],
     *                          "title": "Sample Message",
     *                          "message": "This is the body of the message.",
     *                          "isImportant": true
     *                       }
     *
     * @return ResponseEntity containing:
     *      - HTTP 200 OK if the message was successfully saved.
     *      - HTTP 500 Internal Server Error if there is an issue with saving the message or processing the request.
     *
     * @throws Exception if there is an issue processing the request or saving the message.
     */
    @PostMapping("/api/messages")
    public ResponseEntity<?> addMessage(@Valid @RequestBody MessageFormDTO messageFormDTO) {
        try {
            messageService.saveMessageForm(messageFormDTO);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
