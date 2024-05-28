package app.service;

import app.dto.chat.ChatResponse;
import app.dto.message.MessageRequest;
import app.dto.message.MessageResponse;
import app.dto.message.UpdateMessageRequest;
import app.dto.chat.UserInChatRepresentation;
import app.entity.Chat;
import app.entity.Message;
import app.entity.User;
import app.exception.ResourceNotFoundException;
import app.repository.ChatRepository;
import app.repository.MessageRepository;
import app.utils.ContentType;
import app.utils.MessageStatus;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepo;
    private final UserService userService;
    private final ChatRepository chatRepo;
    private final ChatService chatService;
    private final ModelMapper modelMapper;

    public MessageResponse createNewMessage(MessageRequest msgRq, User authUser) {
        User chatParticipant = chatService.getChatParticipant(msgRq.getChatId(), authUser);
        Message message = convertToMessage(msgRq, authUser);
        System.out.println("createNewMessage METHOD IS WORKING IN MessageService!!!");
        System.out.println(message);
        Message savedMessage = messageRepo.save(message);
        chatService.updateLastModifiedDate(savedMessage.getChat(), savedMessage.getLastModifiedDate());
        return convertToMessageResponse(savedMessage, chatParticipant);
    }

    private MessageResponse convertToMessageResponse(Message savedMessage, User chatParticipant) {
        MessageResponse msg = modelMapper.map(savedMessage, MessageResponse.class);
        ChatResponse chatResponse = chatService.convertToChatResponse(savedMessage.getChat(), chatParticipant);
        UserInChatRepresentation sender = modelMapper.map(savedMessage.getSender(), UserInChatRepresentation.class);
        msg.setChat(chatResponse);
        msg.setSender(sender);
        if(savedMessage.getLastModifiedDate().isAfter(savedMessage.getCreatedDate())) {
            msg.setEdited(true);
        }
        return msg;
    }

    private Message convertToMessage(MessageRequest msgRq, User authUser) {
        Chat chat = chatRepo.findById(msgRq.getChatId()).orElseThrow(() -> new ResourceNotFoundException("Chat is not found!"));
        return new Message(ContentType.fromString(msgRq.getContentType()), msgRq.getContent(), authUser, chat, MessageStatus.SENT);
    }

    public List<MessageResponse> getChatMessages(Long chatId) {
        User chatParticipant = chatService.getChatParticipant(chatId, userService.getAuthUser());

        return chatRepo.findById(chatId)
                .orElseThrow(() -> new ResourceNotFoundException("Chat is not found!"))
                .getMessages()
                .stream().map(msg -> convertToMessageResponse(msg, chatParticipant))
                .toList();
    }

    public Page<MessageResponse> getPageChatMessages(Long chatId, Integer page, Integer size){
        Pageable pageable = PageRequest.of(page, size);
        User chatParticipant = chatService.getChatParticipant(chatId, userService.getAuthUser());
        return messageRepo.findByChatId(chatId, pageable)
                .map(msg -> convertToMessageResponse(msg, chatParticipant));
    }

    public boolean deleteMessageById(Long messageId) {
        Optional<Message> message = messageRepo.findById(messageId);
        if(message.isPresent()) {
            messageRepo.deleteById(messageId);
            return true;
        }
        return false;
    }

    public MessageResponse updateMessage(Long messageId, UpdateMessageRequest newContent) {
        Message message = messageRepo.findById(messageId).orElseThrow(() -> new ResourceNotFoundException("Message is not found!"));
        User chatParticipant = chatService.getChatParticipant(message.getChat().getId(), userService.getAuthUser());
        message.setContent(newContent.getContent());
        message.setLastModifiedDate(LocalDateTime.now());
        Message updatedMessage = messageRepo.save(message);
        return convertToMessageResponse(updatedMessage, chatParticipant);
    }

    public Long countUnreadMessages(User user, Long chatId) {
        List<Message> allSentMessages = messageRepo.getAllSentMessages(chatId);
        return allSentMessages.stream().filter(m -> !m.getSender().equals(user)).count();
    }

    public MessageResponse updateStatus(Long messageId, MessageStatus status, User authUser) {
        Message message = messageRepo.findById(messageId).orElseThrow(() -> new ResourceNotFoundException("Message is not found!"));
        User chatParticipant = chatService.getChatParticipant(message.getChat().getId(), authUser);
        message.setStatus(status);
        Message updatedMessage = messageRepo.save(message);
        return convertToMessageResponse(updatedMessage, chatParticipant);
    }
}
