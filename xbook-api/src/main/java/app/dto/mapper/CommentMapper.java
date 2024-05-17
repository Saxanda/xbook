package app.dto.mapper;

import app.dto.request.CommentRequest;
import app.dto.response.CommentResponse;
import app.entity.Comment;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;


@Component
public class CommentMapper {

    private final ModelMapper modelMapper;

    public CommentMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public Comment toComment(CommentRequest request) {

        return modelMapper.map(request, Comment.class);
    }

    public CommentResponse toCommentResponse(Comment comment) {
        return modelMapper.map(comment, CommentResponse.class);
    }

    public void updateCommentFromRequest(CommentRequest request, Comment comment) {
        modelMapper.map(request, comment);
    }
}
