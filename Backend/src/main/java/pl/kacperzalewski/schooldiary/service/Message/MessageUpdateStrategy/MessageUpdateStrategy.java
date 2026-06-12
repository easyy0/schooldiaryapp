package pl.kacperzalewski.schooldiary.service.Message.MessageUpdateStrategy;

import pl.kacperzalewski.schooldiary.entity.MessageRecipient;

public interface MessageUpdateStrategy {
    boolean update(MessageRecipient messageRecipient);
}
