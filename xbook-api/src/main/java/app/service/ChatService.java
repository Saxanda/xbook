package app.service;

import app.dto.chat.ChatResponseWithLastMessage;
import app.dto.chat.ChatResponse;
import app.dto.message.LastMessageInChat;
import app.dto.chat.UserInChatRepresentation;
import app.entity.Chat;
import app.entity.Message;
import app.entity.User;
import app.exception.ResourceNotFoundException;
import app.repository.ChatRepository;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.webjars.NotFoundException;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ChatService {
    private final ChatRepository chatRepo;
    private final UserService userService;
    private final ModelMapper modelMapper;

    public ChatResponse save(String emailOfChatParticipant) {
        User authUser = userService.getAuthUser();
        User chatParticipant = userService.findByEmail(emailOfChatParticipant).orElseThrow(() -> new ResourceNotFoundException("User is not found!"));

        List<Chat> chats = chatRepo.findChatsByChatParticipantsContainsAndChatParticipantsContains(authUser, chatParticipant);
        System.out.println("chat in save new chat method!");
        System.out.println(chats);

        if(!chats.isEmpty()) {
            return convertToCreatedNewChatResponse(chats.get(0), chatParticipant);
        }
        Chat newChat = new Chat(List.of(authUser, chatParticipant));
        Chat savedChat = chatRepo.save(newChat);
        return convertToCreatedNewChatResponse(savedChat, chatParticipant);
    }
    public boolean deleteById(Long id) {
        Optional<Chat> chat = chatRepo.findById(id);
        if(chat.isPresent()) {
            chatRepo.deleteById(id);
            return true;
        }
        return false;
    }

    public ChatResponseWithLastMessage findById(Long id) {
        Chat chat = chatRepo.findById(id).orElseThrow(() -> new NotFoundException("Chat is not found!"));
        return convertToChatResponse(chat);
    }

    public List<ChatResponseWithLastMessage> getAllUserChats() {
        User authUser = userService.getAuthUser();
        System.out.println("Auth user in chatService!");
        System.out.println(authUser);

        System.out.println("user chats!");
        System.out.println(chatRepo.findByChatParticipantsContainingOrderByLastModifiedDateDesc(authUser));

        return chatRepo.findByChatParticipantsContainingOrderByLastModifiedDateDesc(authUser)
                .stream()
                .map(chat -> convertToChatResponse(chat))
                .toList();
//        return chatRepo.findAll();
    }

    public ChatResponse convertToChatResponse(Chat chat, User chatParticipant) {
        ChatResponse chatResponse = modelMapper.map(chat, ChatResponse.class);
        UserInChatRepresentation participant = modelMapper.map(chatParticipant, UserInChatRepresentation.class);
        chatResponse.setChatParticipant(participant);
        return chatResponse;
    }

    private ChatResponseWithLastMessage convertToChatResponse(Chat chat) {
        ChatResponseWithLastMessage chatResponseWithLastMessage = modelMapper.map(chat, ChatResponseWithLastMessage.class);

        User chatParticipant = getChatParticipant(chat.getId());
        UserInChatRepresentation participant = modelMapper.map(chatParticipant, UserInChatRepresentation.class);
        chatResponseWithLastMessage.setChatParticipant(participant);

        getLastMessage(chat).ifPresent(chatResponseWithLastMessage::setLastMessage);
        return chatResponseWithLastMessage;
    }

    private ChatResponse convertToCreatedNewChatResponse(Chat chat, User chatParticipant) {
        ChatResponse chatResponse = modelMapper.map(chat, ChatResponse.class);

        UserInChatRepresentation participant = modelMapper.map(chatParticipant, UserInChatRepresentation.class);
        chatResponse.setChatParticipant(participant);

        return chatResponse;
    }

    private Optional<LastMessageInChat> getLastMessage(Chat chat) {
        System.out.println(chat.getMessages());

//        System.out.println(chat.getMessages().stream().sorted(Comparator.comparing(Message::getCreatedDate).reversed()).limit(1).findFirst());

        return chat.getMessages().stream()
                .max(Comparator.comparing(Message::getCreatedDate))
                .map(this::convertToLastMessageInChat);
//                .sorted(Comparator.comparing(Message::getCreatedDate).reversed())
//                .limit(1)
//                .map(msg -> convertToLastMessageInChat(msg))
//                .findFirst();
    }

    private LastMessageInChat convertToLastMessageInChat(Message msg) {
        LastMessageInChat lastMessage = modelMapper.map(msg, LastMessageInChat.class);
        UserInChatRepresentation sender = modelMapper.map(msg.getSender(), UserInChatRepresentation.class);
        lastMessage.setSender(sender);
        return lastMessage;
    }

    public User getChatParticipant(Long chatId) {
        User authUser = userService.getAuthUser();
        Chat chat = chatRepo.findById(chatId).orElseThrow(() -> new ResourceNotFoundException("Chat is not found!"));

        List<User> chatParticipants = chat.getChatParticipants();
        if (!chatParticipants.contains(authUser)) throw new ResourceNotFoundException("User is not found!");

        return getParticipant(chatParticipants, authUser)
                .orElseThrow(() -> new ResourceNotFoundException("Chat participant is not found!"));

    }

    private Optional<User> getParticipant(List<User> chatParticipants, User authUser) {
        return chatParticipants.stream()
                .filter(u -> !u.getId().equals(authUser.getId()))
                .findFirst();
    }

    public void updateLastModifiedDate(Chat chat, LocalDateTime lastModifiedDate) {
        Chat chatFromDB = chatRepo.findById(chat.getId()).orElseThrow(() -> new NotFoundException("Chat is not found!"));
        chatFromDB.setLastModifiedDate(lastModifiedDate);
        // Will update property 'LastModifiedDate' in chat in DB
        chatRepo.save(chatFromDB);
    }
}
