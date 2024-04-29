package app.service;

import app.dto.mapper.BookmarkMapper;
import app.dto.request.BookmarkRequest;
import app.dto.response.BookmarkResponse;
import app.entity.Bookmark;
import app.repository.BookmarkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookmarkService {
    private final BookmarkRepository bookmarkRepository;
    private final BookmarkMapper bookmarkMapper;

    public BookmarkResponse createBookmark(BookmarkRequest bookmarkRequest) {
        Bookmark bookmark = bookmarkMapper.toBookmarkRequest(bookmarkRequest);
        Bookmark savedBookmark = bookmarkRepository.save(bookmark);
        return bookmarkMapper.toBookmarkResponse(savedBookmark);
    }

    public List<BookmarkResponse> getAllBookmarksByUserId(Long userId) {
        List<Bookmark> bookmarks = bookmarkRepository.findByUserId(userId);
        return bookmarks.stream()
                .map(bookmarkMapper::toBookmarkResponse)
                .collect(Collectors.toList());
    }

    public List<BookmarkResponse> getAllBookmarksByPostId(Long postId) {
        List<Bookmark> bookmarks = bookmarkRepository.findByPostId(postId);
        return bookmarks.stream()
                .map(bookmarkMapper::toBookmarkResponse)
                .collect(Collectors.toList());
    }

    public boolean deleteBookmark(Long bookmarkId) {
        if (bookmarkRepository.existsById(bookmarkId)) {
            bookmarkRepository.deleteById(bookmarkId);
            return true;
        }
        return false;
    }
}
