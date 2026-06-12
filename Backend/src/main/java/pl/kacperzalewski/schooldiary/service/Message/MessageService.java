package pl.kacperzalewski.schooldiary.service.Message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.kacperzalewski.schooldiary.dto.MessageDescriptionDto;
import pl.kacperzalewski.schooldiary.dto.MessageDto;
import pl.kacperzalewski.schooldiary.dto.MessageFormDTO;
import pl.kacperzalewski.schooldiary.dto.MessageUpdateDTO;
import pl.kacperzalewski.schooldiary.entity.Message;
import pl.kacperzalewski.schooldiary.entity.MessageRecipient;
import pl.kacperzalewski.schooldiary.entity.User;
import pl.kacperzalewski.schooldiary.entity.enums.MessageStatus;
import pl.kacperzalewski.schooldiary.entity.enums.MessageType;
import pl.kacperzalewski.schooldiary.exception.BadCredentialsException;
import pl.kacperzalewski.schooldiary.repository.MessageRepository;
import pl.kacperzalewski.schooldiary.service.NewsService;
import pl.kacperzalewski.schooldiary.service.UserService;
import pl.kacperzalewski.schooldiary.util.TextFormatter;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.stream.Collectors;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    private final UserService userService;
    private final NewsService newsService;
    private final MessageFilterService messageFilterService;
    private final MessageDtoService messageDtoService;
    private final MessageDescriptionService messageDescriptionService;
    private final MessageRecipientService messageRecipientService;

    @Autowired
    public MessageService(
            MessageRepository messageRepository,
            UserService userService,
            NewsService newsService,
            MessageFilterService messageFilterService,
            MessageDtoService messageDtoService,
            MessageDescriptionService messageDescriptionService,
            MessageRecipientService messageRecipientService
    ) {
        this.messageRepository = messageRepository;
        this.userService = userService;
        this.newsService = newsService;
        this.messageFilterService = messageFilterService;
        this.messageDtoService = messageDtoService;
        this.messageDescriptionService = messageDescriptionService;
        this.messageRecipientService = messageRecipientService;
    }

    private Page<Message> getFilteredMessages(Long userId, String messagesFilter, Pageable pageable, String searchParam) {
        return messageFilterService.retrieveMessagesBasedOnFilterAndSearchQuery(userId, messagesFilter, pageable, searchParam);
    }

    public void saveMessageForm(MessageFormDTO messageFormDTO) throws BadCredentialsException {
        Message message = new Message();

        if (messageFormDTO.getIsImportant() == null) {
            messageFormDTO.setIsImportant(false);
        }

        Set<MessageRecipient> recipientSet = new HashSet<>();

        for (long receiver : messageFormDTO.getReceivers()) {
            MessageRecipient messageRecipient = new MessageRecipient();
            messageRecipient.setRecipient(userService.getUserById(receiver));
            messageRecipient.setMessageStatus(MessageStatus.UNREAD);
            recipientSet.add(messageRecipient);
        }

        MessageRecipient senderRecipient = new MessageRecipient();
        senderRecipient.setRecipient(userService.getLoggedInUser());
        senderRecipient.setMessageStatus(MessageStatus.SENT);
        recipientSet.add(senderRecipient);

        message.setTitle(messageFormDTO.getTitle());
        message.setDescription(messageFormDTO.getMessage());
        message.setType(messageFormDTO.getIsImportant() ? MessageType.IMPORTANT : MessageType.DEFAULT);
        message.setSender(userService.getLoggedInUser());
        message.setDate(LocalDateTime.now());

        message.setRecipients(recipientSet);
        saveMessage(message);
    }

    public long getUnreadMessageCount() throws BadCredentialsException {
        return messageRepository.countUnreadenMessagesByUserId(userService.getLoggedInUser().getId());
    }

    public MessageDescriptionDto getMessageDescriptionById(Long messageId) throws BadCredentialsException {
        return messageDescriptionService.getMessageDescriptionById(messageId);
    }

    private String createMessageHeader(String firstname, String lastname) {
        String firstLetterFirstname = TextFormatter.getFirstLetterFromString(firstname);
        String firstLetterLastname = TextFormatter.getFirstLetterFromString(lastname);

        return String.format("%s%s", firstLetterFirstname, firstLetterLastname);
    }

    public void saveMessage(Message message) {
        message.getRecipients().forEach((messageRecipient) -> {
            User sender = message.getSender();
            String senderFirstname = sender.getFirstname();
            String senderLastname = sender.getLastname();

            String messageTitle = "Message";
            String messageHeader = createMessageHeader(senderFirstname, senderLastname);
            String messageDescription = String.format("sent by %s %s", senderFirstname, senderLastname);

            newsService.prepareAndSaveNewsForUser(sender, messageTitle, messageHeader, messageDescription);
        });

        messageRepository.save(message);
    }

    public Page<MessageDto> getUserMessages(String messagesFilter, int page, String searchParam) throws BadCredentialsException {
        int size = 25;
        page = Math.max(page, 1);
        Pageable pageable = PageRequest.of(page - 1, size);
        Long userId = userService.getLoggedInUser().getId();

        messagesFilter = messagesFilter == null ? "all" : messagesFilter;
        searchParam = searchParam == null ? "" : searchParam;

        Page<Message> messages = messageFilterService.retrieveMessagesBasedOnFilterAndSearchQuery(userId, messagesFilter, pageable, searchParam);

        Page<MessageDto> messagesDto = messageDtoService.mapMessagesToDto(messages, userId);

        return messagesDto;
    }

    public int updateMessages(MessageUpdateDTO messageUpdateDTO) throws BadCredentialsException {
        return messageRecipientService.updateMultipleMessageStatuses(messageUpdateDTO);
    }
}
