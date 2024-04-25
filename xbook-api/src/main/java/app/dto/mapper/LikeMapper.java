package app.dto.mapper;

import app.dto.response.LikeResponse;
import app.entity.Like;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class LikeMapper {
    private final ModelMapper modelMapper;

    public LikeMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public LikeResponse toLikeResponse(Like like) {
        return modelMapper.map(like, LikeResponse.class);
    }

}
