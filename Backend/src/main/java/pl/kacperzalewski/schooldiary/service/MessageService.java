package pl.kacperzalewski.schooldiary.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.kacperzalewski.schooldiary.dto.MessageDto;
import pl.kacperzalewski.schooldiary.dto.MessageFormDTO;
import pl.kacperzalewski.schooldiary.entity.Message;
import pl.kacperzalewski.schooldiary.entity.MessageRecipient;
import pl.kacperzalewski.schooldiary.entity.News;
import pl.kacperzalewski.schooldiary.entity.enums.MessageStatus;
import pl.kacperzalewski.schooldiary.entity.enums.MessageType;
import pl.kacperzalewski.schooldiary.exception.UserNotFoundException;
import pl.kacperzalewski.schooldiary.repository.MessageRepository;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    private final UserService userService;

    private final NewsService newsService;

    @Autowired
    public MessageService(MessageRepository messageRepository, UserService userService, NewsService newsService) {
        this.messageRepository = messageRepository;
        this.userService = userService;
        this.newsService = newsService;

        Message message = new Message();
        message.setTitle("Tytul wiadomosci");
        message.setDescription("Opis wiadomosci");
        message.setDate(LocalDateTime.now());
        message.setType(MessageType.DEFAULT);
        message.setSender(userService.getUserById(2));
        MessageRecipient messageRecipient = new MessageRecipient();
        messageRecipient.setMessageStatus(MessageStatus.UNREADEN);
        messageRecipient.setDeleted(false);
        messageRecipient.setArchived(false);
        messageRecipient.setRecipient(userService.getUserById(3));
        message.setRecipients(Set.of(messageRecipient));
        messageRepository.save(message);

        Message message2 = new Message();
        message2.setTitle("Tytul wiadomosci");
        message2.setDescription("Opis wiadomosci");
        message2.setDate(LocalDateTime.now());
        message2.setType(MessageType.DEFAULT);
        message2.setSender(userService.getUserById(2));
        MessageRecipient messageRecipient2 = new MessageRecipient();
        messageRecipient2.setMessageStatus(MessageStatus.READEN);
        messageRecipient2.setDeleted(false);
        messageRecipient2.setArchived(false);
        messageRecipient2.setRecipient(userService.getUserById(3));
        message2.setRecipients(Set.of(messageRecipient2));
        messageRepository.save(message2);

        Message message3 = new Message();
        message3.setTitle("Tytul wiadomosci");
        message3.setDescription("Opis wiadomosci");
        message3.setDate(LocalDateTime.now());
        message3.setType(MessageType.IMPORTANT);
        message3.setSender(userService.getUserById(2));
        MessageRecipient messageRecipient3 = new MessageRecipient();
        messageRecipient3.setMessageStatus(MessageStatus.UNREADEN);
        messageRecipient3.setDeleted(false);
        messageRecipient3.setArchived(false);
        messageRecipient3.setRecipient(userService.getUserById(3));
        message3.setRecipients(Set.of(messageRecipient3));
        messageRepository.save(message3);

        Message message4 = new Message();
        message4.setTitle("Tytul wiadomosci");
        message4.setDescription("Opis wiadomosci");
        message4.setDate(LocalDateTime.now());
        message4.setType(MessageType.IMPORTANT);
        message4.setSender(userService.getUserById(2));
        MessageRecipient messageRecipient4 = new MessageRecipient();
        messageRecipient4.setMessageStatus(MessageStatus.UNREADEN);
        messageRecipient4.setDeleted(false);
        messageRecipient4.setArchived(false);
        messageRecipient4.setRecipient(userService.getUserById(3));
        message4.setRecipients(Set.of(messageRecipient4));
        messageRepository.save(message4);

        Message message5 = new Message();
        message5.setTitle("Tytul wiadomosci");
        message5.setDescription("Opis wiadomosci");
        message5.setDate(LocalDateTime.now());
        message5.setType(MessageType.IMPORTANT);
        message5.setSender(userService.getUserById(2));
        MessageRecipient messageRecipient5 = new MessageRecipient();
        messageRecipient5.setMessageStatus(MessageStatus.UNREADEN);
        messageRecipient5.setDeleted(false);
        messageRecipient5.setArchived(false);
        messageRecipient5.setRecipient(userService.getUserById(3));
        message5.setRecipients(Set.of(messageRecipient5));
        messageRepository.save(message5);

        Message message6 = new Message();
        message6.setTitle("Tytul wiadomosci");
        message6.setDescription("Opis wiadomosci");
        message6.setDate(LocalDateTime.now());
        message6.setType(MessageType.IMPORTANT);
        message6.setSender(userService.getUserById(2));
        MessageRecipient messageRecipient6 = new MessageRecipient();
        messageRecipient6.setMessageStatus(MessageStatus.UNREADEN);
        messageRecipient6.setDeleted(false);
        messageRecipient6.setArchived(false);
        messageRecipient6.setRecipient(userService.getUserById(3));
        message6.setRecipients(Set.of(messageRecipient6));
        messageRepository.save(message6);

        Message message7 = new Message();
        message7.setTitle("Tytul wiadomosci");
        message7.setDescription("Opis wiadomosci");
        message7.setDate(LocalDateTime.now());
        message7.setType(MessageType.IMPORTANT);
        message7.setSender(userService.getUserById(2));
        MessageRecipient messageRecipient7 = new MessageRecipient();
        messageRecipient7.setMessageStatus(MessageStatus.UNREADEN);
        messageRecipient7.setDeleted(false);
        messageRecipient7.setArchived(false);
        messageRecipient7.setRecipient(userService.getUserById(3));
        message7.setRecipients(Set.of(messageRecipient7));
        messageRepository.save(message7);
    }

    private Page<Message> filterMessagesByFilter(Long userId, String messagesFilter, Pageable pageable) {
        messagesFilter = messagesFilter.toUpperCase();

        Page<Message> messages;

        if (messagesFilter.equals("ARCHIVED")) {
            messages = messageRepository.findArchivedMessagesByRecipient(userId, pageable);
        } else {
            try {
                MessageStatus status = MessageStatus.valueOf(messagesFilter);
                messages = messageRepository.findMessagesByRecipient(userId, status, pageable);
            } catch (IllegalArgumentException e) {
                MessageType messageType = MessageType.valueOf(messagesFilter);
                messages = messageRepository.findMessagesByRecipient(userId, messageType, pageable);
            }
        }

        return messages;
    }

    public void saveMessageForm(MessageFormDTO messageFormDTO) throws UserNotFoundException {
        System.out.println("Message: " + messageFormDTO.getMessage());
        Message message = new Message();

        if (messageFormDTO.getIsImportant() == null) {
            messageFormDTO.setIsImportant(false);
        }

        Set<MessageRecipient> recipientSet = new HashSet<>();
        String[] receiversArray = messageFormDTO.getReceivers().split(",");

        for (String receiver : receiversArray) {
            MessageRecipient messageRecipient = new MessageRecipient();
            messageRecipient.setRecipient(userService.getUserById(Integer.parseInt(receiver.trim())));
            messageRecipient.setMessageStatus(MessageStatus.UNREADEN);
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
        messageRepository.save(message);
    }

    public Boolean updateMessage(long messageId, String method) throws UserNotFoundException {
        Long userId = userService.getLoggedInUser().getId();
        Message actualMessage =  messageRepository.findMessageByIdAndRecipientsRecipientId(messageId, userId);
        boolean[] removeOneFromMessageCount = { false };

        switch (method) {
            case "read":
                actualMessage.getRecipients().forEach(r -> {
                    if (r.getRecipient().getId().equals(userId)) {
                        if (r.getMessageStatus().equals(MessageStatus.UNREADEN)) {
                            r.setMessageStatus(MessageStatus.READEN);
                            removeOneFromMessageCount[0] = true;
                        }
                    }
                });
                break;
            case "archive":
                actualMessage.getRecipients().forEach(r -> {
                    if (r.getRecipient().getId().equals(userId)) {
                        r.setArchived(!r.isArchived());
                    }
                });
                break;
            case "delete":
                actualMessage.getRecipients().forEach(r -> {
                    if (r.getRecipient().getId().equals(userId)) {
                        r.setDeleted(true);
                    }
                });
                break;
        }

        messageRepository.save(actualMessage);
        return removeOneFromMessageCount[0];
    }

    public Page<MessageDto> getUserMessages(String messagesFilter, int page) throws UserNotFoundException {
        int size = 6;
        Pageable pageable = PageRequest.of(page - 1, size);
        Long userId = userService.getLoggedInUser().getId();

        Page<Message> messages = (messagesFilter == null) ? messageRepository.findMessagesByRecipient(userId, pageable) :
                filterMessagesByFilter(userId, messagesFilter, pageable);

        Page<MessageDto> messagesDto = messages.map(message -> {
            MessageRecipient recipient = message.getRecipients().stream().filter(r -> r.getRecipient().getId().equals(userId)).findFirst().get();
            MessageDto messageDto = new MessageDto();
            messageDto.setId(message.getId());
            messageDto.setTitle(message.getTitle());
            messageDto.setDescription(message.getDescription());
            messageDto.setSender(message.getSender());
            messageDto.setType(message.getType());
            messageDto.setStatus(recipient.getMessageStatus());
            messageDto.setArchived(recipient.isArchived());
            messageDto.setDate(message.getDate());
            return messageDto;
        });

        return messagesDto;
    }

    public long getNewMessageCount() throws UserNotFoundException {
        return messageRepository.countMessagesByRecipientUserId(userService.getLoggedInUser().getId());
    }

    public void saveMessage(Message message) {
        message.getRecipients().forEach((messageRecipient) -> {
            News news = new News();
            news.setUser(messageRecipient.getRecipient());
            news.setHeader(message.getSender().getFirstname().substring(0, 1) + message.getSender().getLastname().substring(0,
                    1));
            news.setDescription("sent by " + message.getSender().getFirstname() + ' ' + message.getSender().getLastname());
            news.setTitle("Message");
            newsService.saveUserNews(news);
        });
        messageRepository.save(message);
    }

    public MessageDto getMessageById(Long messageId) throws UserNotFoundException {
        Long userId = userService.getLoggedInUser().getId();
        Message message =
                messageRepository.findMessageByIdAndRecipientsRecipientId(messageId, userId);
        message.getRecipients().forEach(r -> {
            if (r.getRecipient().getId().equals(userId) && r.getMessageStatus() != MessageStatus.SENT) {
                r.setMessageStatus(MessageStatus.READEN);
            }
        });
        MessageDto messageDto = new MessageDto();
        messageDto.setId(message.getId());
        messageDto.setDescription(message.getDescription());
        messageDto.setTitle(message.getTitle());
        messageDto.setDate(message.getDate());
        messageDto.setSender(message.getSender());
        messageRepository.save(message);
        return messageDto;
    }
}