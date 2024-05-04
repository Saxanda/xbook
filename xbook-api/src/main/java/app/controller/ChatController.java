package app.controller;

import app.dto.chat.ChatResponseWithLastMessage;
import app.dto.chat.ChatResponse;
import app.dto.message.MessageResponse;
import app.service.ChatService;
import app.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/chats")
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;
    private final MessageService messageService;

    @GetMapping()
    // Returns all chats of a particular user
    public List<ChatResponseWithLastMessage> getAllChats() {
        return chatService.getAllUserChats();
    }

    // Creates new chat with a person with {email}
    @PostMapping("/create/{email}")
    public ChatResponse createNewChat(@PathVariable("email") String emailOfChatParticipant) {
        return chatService.save(emailOfChatParticipant);
    }

    @GetMapping("/{id}")
    public ChatResponseWithLastMessage getChat(@PathVariable("id") Long chatId) {
        return chatService.findById(chatId);
    }

    // Delete chat and all its messages
    @DeleteMapping("/delete/{id}")
    public boolean deleteChat(@PathVariable("id") Long chatId) {
        return chatService.deleteById(chatId);
    }

    @GetMapping("/messages/{id}")
    public List<MessageResponse> getMessages(@PathVariable("id") Long chatId) {
        return messageService.getChatMessages(chatId);
    }
}
