package app.dto.mapper;

import app.dto.request.BookmarkRequest;
import app.dto.response.BookmarkResponse;
import app.entity.Bookmark;
import org.springframework.stereotype.Component;

@Component
public class BookmarkMapper {
    public Bookmark toBookmarkRequest(BookmarkRequest bookmarkRequest) {
        if (bookmarkRequest == null) {
            return null;
        }
        Bookmark bookmark = new Bookmark();
        bookmark.setUserId(bookmarkRequest.getUserId());
        bookmark.setPostId(bookmarkRequest.getPostId());
        return bookmark;
    }

    public BookmarkResponse toBookmarkResponse(Bookmark savedBookmark) {
        if (savedBookmark == null) {
            return null;
        }
        BookmarkResponse response = new BookmarkResponse();
        response.setBookmarkId(savedBookmark.getId());
        response.setUserId(savedBookmark.getUserId());
        response.setPostId(savedBookmark.getPostId());
        return response;
    }
}
