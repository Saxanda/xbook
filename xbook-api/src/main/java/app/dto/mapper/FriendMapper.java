package app.dto.mapper;

import app.dto.response.FriendResponse;
import app.entity.Friend;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.stereotype.Component;

@Component
public class FriendMapper {
    private final ModelMapper modelMapper;
    private final TypeMap<Friend, FriendResponse> typeMap;

    public FriendMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
        this.typeMap = modelMapper.createTypeMap(Friend.class, FriendResponse.class);
        configureFriendToFriendResponseMapping();
    }

    private void configureFriendToFriendResponseMapping() {
        typeMap.addMappings(mapper -> {
            mapper.map(src -> src.getUser().getId(), FriendResponse::setUserId);
            mapper.map(src -> src.getFriend().getId(), FriendResponse::setFriendId);
        });
    }

    public FriendResponse friendToFriendResponse(Friend friend) {
        return modelMapper.map(friend, FriendResponse.class);
    }

}