package pl.kacperzalewski.schooldiary.service.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import pl.kacperzalewski.schooldiary.dto.MessageDto;
import pl.kacperzalewski.schooldiary.dto.MessageRecipientDto;
import pl.kacperzalewski.schooldiary.dto.UserDTO;
import pl.kacperzalewski.schooldiary.entity.Message;
import pl.kacperzalewski.schooldiary.entity.MessageRecipient;
import pl.kacperzalewski.schooldiary.entity.enums.MessageStatus;

import java.util.stream.Collectors;

@Service
public class MessageDtoService {

    private final MessageRecipientService messageRecipientService;

    @Autowired
    public MessageDtoService(MessageRecipientService messageRecipientService) {
        this.messageRecipientService = messageRecipientService;
    }

    public Page<MessageDto> mapMessagesToDto(Page<Message> messages, Long recipientId) {
        return messages.map(message -> {
            MessageRecipient recipient = messageRecipientService.findRecipientByIdInMessage(recipientId, message);

            if (recipient == null) {
                throw new IllegalArgumentException("Recipient not found in message");
            }

            MessageDto messageDto = MessageDto.builder()
                    .id(message.getId())
                    .title(message.getTitle())
                    .sender(UserDTO.fromEntity(message.getSender()))
                    .type(message.getType())
                    .status(recipient.getMessageStatus())
                    .isArchived(recipient.isArchived())
                    .date(message.getDate())
                    .build();

            if (recipient.getMessageStatus().equals(MessageStatus.SENT)) {
                messageDto.setRecipients(messageRecipientService.retrieveMessageRecipientsExceptSender(recipientId, message)
                        .stream()
                        .map(MessageRecipientDto::fromEntity)
                        .collect(Collectors.toSet()));
            }

            return messageDto;
        });
    }
}
