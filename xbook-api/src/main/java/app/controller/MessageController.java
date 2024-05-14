package app.controller;

import app.dto.message.MessageRequest;
import app.dto.message.MessageResponse;
import app.dto.message.UpdateMessageRequest;
import app.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;

    @PostMapping("/send")
    public MessageResponse sendMessage(@RequestBody MessageRequest msgRq) {
        return messageService.sendNewMessage(msgRq);
    }

    @DeleteMapping("/delete/{id}")
    public boolean deleteMessage(@PathVariable("id") Long messageId) {
        return messageService.deleteMessageById(messageId);
    }
    @PostMapping("/update/{id}")
    public MessageResponse updateMessage(@PathVariable("id") Long messageId, @RequestBody UpdateMessageRequest newContent) {
        return messageService.updateMessage(messageId, newContent);
    }

}
