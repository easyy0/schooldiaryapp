package pl.kacperzalewski.schooldiary.service.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.kacperzalewski.schooldiary.dto.MessageUpdateDTO;
import pl.kacperzalewski.schooldiary.entity.Message;
import pl.kacperzalewski.schooldiary.entity.MessageRecipient;
import pl.kacperzalewski.schooldiary.entity.enums.MessageStatus;
import pl.kacperzalewski.schooldiary.repository.MessageRepository;
import pl.kacperzalewski.schooldiary.service.Message.MessageUpdateStrategy.MessageUpdateStrategyContext;
import pl.kacperzalewski.schooldiary.service.UserService;

import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;

@Service
public class MessageRecipientService {

    private final UserService userService;
    private final MessageRepository messageRepository;
    private final MessageUpdateStrategyContext messageUpdateStrategyContext;

    @Autowired
    public MessageRecipientService(UserService userService, MessageRepository messageRepository) {
        this.userService = userService;
        this.messageRepository = messageRepository;
        this.messageUpdateStrategyContext = new MessageUpdateStrategyContext();
    }

    public boolean updateMessageRecipientStatus(Long messageId, Long recipientId, String method) {
        Message actualMessage = messageRepository.findMessageByIdAndRecipientsRecipientId(messageId, recipientId);

        if (actualMessage == null) {
            throw new IllegalArgumentException("Message not found");
        }

        messageUpdateStrategyContext.updateStrategy(method);

        boolean messageAffected = false;

        for (MessageRecipient recipient : actualMessage.getRecipients()) {
            if (recipient.getRecipient().getId().equals(recipientId)) {
                messageAffected = messageUpdateStrategyContext.executeStrategy(recipient);
                break;
            }
        }

        messageRepository.save(actualMessage);
        return messageAffected;
    }

    public int updateMultipleMessageStatuses(MessageUpdateDTO messageUpdateDTO) {
        Long userId = userService.getLoggedInUser().getId();
        int messagesAffected = 0;

        for (long messageId : messageUpdateDTO.getMessagesIds()) {
            if (updateMessageRecipientStatus(messageId, userId, messageUpdateDTO.getMethod())) {
                messagesAffected++;
            }
        }
        return messagesAffected;
    }

    public void updateMessageRecipientReadStatus(long recipientId, Message message) {
        message.getRecipients().stream()
                .filter(r -> r.getRecipient().getId().equals(recipientId) && r.getMessageStatus() != MessageStatus.SENT)
                .findFirst()
                .ifPresent(r -> r.setMessageStatus(MessageStatus.READ));
    }

    public Set<MessageRecipient> retrieveMessageRecipientsExceptSender(Long senderId, Message message) {
        return message
                .getRecipients()
                .stream()
                .filter(r -> !r.getRecipient().getId().equals(senderId))
                .collect(Collectors.toSet());
    }

    public MessageRecipient findRecipientByIdInMessage(Long recipientId, Message message) {
        return message.getRecipients()
                .stream()
                .filter(r -> r.getRecipient().getId().equals(recipientId))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Recipient not found"));
    }
}
