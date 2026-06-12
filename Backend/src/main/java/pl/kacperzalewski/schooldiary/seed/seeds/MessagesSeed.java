package pl.kacperzalewski.schooldiary.seed.seeds;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.kacperzalewski.schooldiary.entity.Message;
import pl.kacperzalewski.schooldiary.entity.MessageRecipient;
import pl.kacperzalewski.schooldiary.entity.User;
import pl.kacperzalewski.schooldiary.entity.enums.MessageStatus;
import pl.kacperzalewski.schooldiary.entity.enums.MessageType;
import pl.kacperzalewski.schooldiary.repository.MessageRepository;
import pl.kacperzalewski.schooldiary.seed.DataSeed;
import pl.kacperzalewski.schooldiary.seed.SeedContext;
import pl.kacperzalewski.schooldiary.service.Message.MessageService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
public class MessagesSeed implements DataSeed {
    private record MessageDef(String title, String description, MessageType messageType, User sender, Set<MessageRecipient> messageRecipientSet) {}
    private final MessageService messageService;
    private final MessageRepository messageRepository;

    @Autowired
    public MessagesSeed(
            MessageService messageService,
            MessageRepository messageRepository) {
        this.messageService = messageService;
        this.messageRepository = messageRepository;
    }

    @Override
    public int order() {
        return 60;
    }

    @Override
    public boolean shouldRun() {
        return messageRepository.count() == 0;
    }

    @Override
    public void seed(SeedContext ctx) {
        List<MessageDef> defs = List.of(
                new MessageDef("Tytul wiadomosci", "Opis wiadomosci", MessageType.DEFAULT, ctx.user("teacher"),
                        Set.of(
                               MessageRecipient.builder().recipient(ctx.user("student1a")).messageStatus(MessageStatus.UNREAD).isDeleted(false).isArchived(false).build()
                        )
                )
        );

        for (MessageDef messageDef : defs) {
            messageService.saveMessage(
                    Message.builder()
                            .title(messageDef.title)
                            .description(messageDef.description)
                            .sender(messageDef.sender)
                            .recipients(messageDef.messageRecipientSet)
                            .type(messageDef.messageType)
                            .date(LocalDateTime.now())
                            .build());
        }
    }
}
