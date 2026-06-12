package pl.kacperzalewski.schooldiary.service.Message.MessageUpdateStrategy;

import pl.kacperzalewski.schooldiary.entity.MessageRecipient;

public class ArchiveMessageStrategy implements MessageUpdateStrategy {
    @Override
    public boolean update(MessageRecipient recipient) {
        recipient.setArchived(!recipient.isArchived());
        return true;
    }
}
