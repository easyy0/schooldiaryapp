package pl.kacperzalewski.schooldiary.service.Message;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.kacperzalewski.schooldiary.dto.MessageDescriptionDto;
import pl.kacperzalewski.schooldiary.entity.Message;
import pl.kacperzalewski.schooldiary.entity.enums.MessageStatus;
import pl.kacperzalewski.schooldiary.repository.MessageRepository;
import pl.kacperzalewski.schooldiary.service.UserService;

@Service
public class MessageDescriptionService {

    private final UserService userService;
    private final MessageRecipientService messageRecipientService;
    private final MessageRepository messageRepository;

    @Autowired
    public MessageDescriptionService(UserService userService, MessageRecipientService messageRecipientService, MessageRepository messageRepository) {
        this.userService = userService;
        this.messageRecipientService = messageRecipientService;

        this.messageRepository = messageRepository;
    }

    @Transactional
    public MessageDescriptionDto getMessageDescriptionById(long messageId) {
        Long userId = userService.getLoggedInUser().getId();

        Message message = messageRepository.findMessageByIdAndRecipientsRecipientId(messageId, userId);

        if (message == null) {
            throw new IllegalArgumentException("Message not found");
        }

        messageRecipientService.updateMessageRecipientReadStatus(userId, message);
        messageRepository.save(message);

        MessageDescriptionDto messageDescriptionDto = new MessageDescriptionDto();
        messageDescriptionDto.setDescription(message.getDescription());

        return messageDescriptionDto;
    }
}
