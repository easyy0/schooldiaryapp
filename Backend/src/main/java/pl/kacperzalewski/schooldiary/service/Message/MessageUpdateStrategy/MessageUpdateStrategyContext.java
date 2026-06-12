package pl.kacperzalewski.schooldiary.service.Message.MessageUpdateStrategy;

import pl.kacperzalewski.schooldiary.entity.MessageRecipient;

import java.util.HashMap;
import java.util.Map;

public class MessageUpdateStrategyContext {

    private final Map<String, MessageUpdateStrategy> strategies = new HashMap<>();

    private MessageUpdateStrategy messageUpdateStrategy;

    public MessageUpdateStrategyContext() {
        strategies.put("READ", new ReadMessageStrategy());
        strategies.put("ARCHIVE", new ArchiveMessageStrategy());
        strategies.put("DELETE", new DeleteMessageStrategy());
    }

    public boolean executeStrategy(MessageRecipient messageRecipient) {
        if (messageUpdateStrategy == null) {
            throw new IllegalArgumentException("Message update strategy not set");
        }

        return messageUpdateStrategy.update(messageRecipient);
    }

    public void updateStrategy(String method) {
        MessageUpdateStrategy retrievedStrategy = strategies.get(method);

        if (retrievedStrategy == null) {
            throw new IllegalArgumentException("Invalid update method: " + method);
        }

        this.messageUpdateStrategy = retrievedStrategy;
    }
}
