package app.dto.mapper;

import app.dto.request.NotificationRequest;
import app.dto.response.NotificationResponse;
import app.entity.Notification;
import app.repository.FriendRepository;
import app.repository.UserRepository;
import app.service.UserService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component

public class NotificationMapper {
    private final ModelMapper modelMapper;
    private UserRepository userRepository;
    private FriendRepository friendRepository;

    public NotificationMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public NotificationResponse toNotificationResponse(Notification notification) {
        return modelMapper.map(notification, NotificationResponse.class);
    }

    public Notification toNotificationRequest(NotificationRequest request) {
        Notification notification = modelMapper.map(request, Notification.class);
        return notification;
    }
}
