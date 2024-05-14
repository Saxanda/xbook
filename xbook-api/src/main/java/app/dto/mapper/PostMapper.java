package app.dto.mapper;

import app.dto.request.PostRequest;
import app.dto.response.PostResponse;
import app.entity.Post;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class PostMapper {
    private final ModelMapper modelMapper;

    public PostMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public PostResponse toPostResponse(Post post) {
        return modelMapper.map(post, PostResponse.class);
    }

    public Post toPostRequest(PostRequest postRequest) {
        return modelMapper.map(postRequest, Post.class);
    }

    public void updatePostFromRequest(PostRequest postRequest, Post post) {
        modelMapper.map(postRequest, post);
    }
}
