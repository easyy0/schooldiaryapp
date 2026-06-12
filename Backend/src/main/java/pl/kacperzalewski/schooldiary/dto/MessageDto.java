package pl.kacperzalewski.schooldiary.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.kacperzalewski.schooldiary.entity.enums.MessageStatus;
import pl.kacperzalewski.schooldiary.entity.enums.MessageType;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageDto {

    private Long id;

    private String title;

    private String description;

    private UserDTO sender;

    private Set<MessageRecipientDto> recipients;

    private MessageType type;

    private MessageStatus status;

    private boolean isArchived;

    private LocalDateTime date;
}
