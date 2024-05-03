package app.dto.mapper;

import app.dto.request.NotificationRequest;
import app.dto.response.NotificationResponse;
import app.entity.Notification;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class NotificationMapper {
    private final ModelMapper modelMapper;

    public NotificationMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public NotificationResponse toNotification(Notification notification) {
        return modelMapper.map(notification, NotificationResponse.class);
    }

    public Notification toNotificationRequest(NotificationRequest request) {
        return modelMapper.map(request, Notification.class);
    }
}
