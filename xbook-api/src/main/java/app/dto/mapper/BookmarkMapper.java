package app.dto.mapper;

import app.dto.request.BookmarkRequest;
import app.dto.response.BookmarkResponse;
import app.dto.response.PostResponse;
import app.dto.response.UserDetailsResponse;
import app.entity.Bookmark;
import app.repository.UserRepository;
import app.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BookmarkMapper {
    private final UserRepository userRepository;
    private final PostService postService; // Use PostService for detailed post data.

    public Bookmark toBookmarkRequest(BookmarkRequest bookmarkRequest) {
        if (bookmarkRequest == null) {
            return null;
        }
        Bookmark bookmark = new Bookmark();
        bookmark.setUserId(bookmarkRequest.getUserId());
        bookmark.setPostId(bookmarkRequest.getPostId());
        return bookmark;
    }

    public BookmarkResponse toBookmarkResponse(Bookmark bookmark) {
        if (bookmark == null) {
            return null;
        }
        UserDetailsResponse userDetails = userRepository.findById(bookmark.getUserId())
                .map(user -> new UserDetailsResponse(user.getId(),
                        user.getName(),
                        user.getSurname(),
                        user.getEmail(),
                        user.getAddress(),
                        user.getPhoto(),
                        user.getAvatar(),
                        user.getDob(),
                        user.getGender()))
                .orElse(new UserDetailsResponse());

        PostResponse postResponse = postService.getPostDetails(bookmark.getPostId(), bookmark.getUserId());

        return new BookmarkResponse(
                bookmark.getId(),
                bookmark.getPostId(),
                userDetails,
                postResponse.getBody(),
                postResponse.getMedia(),
                bookmark.getTimestamp(),
                postResponse.getOriginalPost(),
                postResponse.getLikesCount(),
                postResponse.getCommentsCount(),
                postResponse.getRepostsCount(),
                postResponse.getLikesCount() > 0,
                true // Bookmark is always true in this case
        );
    }
}
