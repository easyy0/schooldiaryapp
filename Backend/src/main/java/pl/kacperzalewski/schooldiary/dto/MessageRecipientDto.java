package pl.kacperzalewski.schooldiary.dto;

import pl.kacperzalewski.schooldiary.entity.MessageRecipient;
import pl.kacperzalewski.schooldiary.entity.enums.MessageStatus;

public record MessageRecipientDto(
        Long id,
        UserDTO recipient,
        MessageStatus messageStatus,
        boolean isArchived,
        boolean isDeleted
) {
    public static MessageRecipientDto fromEntity(MessageRecipient messageRecipient) {
        return new MessageRecipientDto(
                messageRecipient.getId(),
                UserDTO.fromEntity(messageRecipient.getRecipient()),
                messageRecipient.getMessageStatus(),
                messageRecipient.isArchived(),
                messageRecipient.isDeleted()
        );
    }
}
