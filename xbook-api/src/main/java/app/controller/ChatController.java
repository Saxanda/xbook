package app.controller;

import app.dto.chat.ChatResponseWithLastMessage;
import app.dto.chat.ChatResponse;
import app.dto.message.MessageResponse;
import app.service.ChatService;
import app.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/chats")
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;
    private final MessageService messageService;

//    @GetMapping()
//    // Returns all chats of a particular user
//    public List<ChatResponseWithLastMessage> getAllChats() {
//        return chatService.getAllUserChats();
//    }

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    // Returns all chats of a particular user with pagination
    public Page<ChatResponseWithLastMessage> getPageAllChats(@RequestParam(defaultValue = "0") Integer page,
                                                             @RequestParam(defaultValue = "5") Integer size) {
        return chatService.getPageAllUserChats(page, size);
    }

    // Creates new chat with a person with {email}
    @PostMapping("/create/{email}")
    @ResponseStatus(HttpStatus.CREATED)
    public ChatResponse createNewChat(@PathVariable("email") String emailOfChatParticipant) {
        return chatService.save(emailOfChatParticipant);
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public ChatResponseWithLastMessage getChat(@PathVariable("id") Long chatId) {
        return chatService.findById(chatId);
    }

    // Delete chat and all its messages
    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean deleteChat(@PathVariable("id") Long chatId) {
        return chatService.deleteById(chatId);
    }

//      old version without pagination
//    @GetMapping("/messages/{id}")
//    @ResponseStatus(HttpStatus.OK)
//    public List<MessageResponse> getMessages(@PathVariable("id") Long chatId) {
//        return messageService.getChatMessages(chatId);
//    }

    @GetMapping("/messages/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Page<MessageResponse> getMessages(@PathVariable("id") Long chatId,
                                             @RequestParam(defaultValue = "0") Integer page,
                                             @RequestParam(defaultValue = "5") Integer size) {
        return messageService.getPageChatMessages(chatId, page, size);
    }

}
