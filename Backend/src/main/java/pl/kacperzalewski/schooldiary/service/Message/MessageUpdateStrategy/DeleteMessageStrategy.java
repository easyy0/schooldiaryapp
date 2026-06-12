package pl.kacperzalewski.schooldiary.service.Message.MessageUpdateStrategy;

import pl.kacperzalewski.schooldiary.entity.MessageRecipient;

public class DeleteMessageStrategy implements MessageUpdateStrategy {
    @Override
    public boolean update(MessageRecipient recipient) {
        recipient.setDeleted(true);
        return true;
    }
}
