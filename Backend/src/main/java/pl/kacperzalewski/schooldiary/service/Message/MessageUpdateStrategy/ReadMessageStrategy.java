package pl.kacperzalewski.schooldiary.service.Message.MessageUpdateStrategy;

import pl.kacperzalewski.schooldiary.entity.MessageRecipient;
import pl.kacperzalewski.schooldiary.entity.enums.MessageStatus;

public class ReadMessageStrategy implements MessageUpdateStrategy {
    @Override
    public boolean update(MessageRecipient recipient) {
        if (recipient.getMessageStatus().equals(MessageStatus.UNREAD)) {
            recipient.setMessageStatus(MessageStatus.READ);
            return true;
        }
        return false;
    }
}