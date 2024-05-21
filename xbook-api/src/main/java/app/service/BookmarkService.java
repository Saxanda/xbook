package app.service;

import app.dto.mapper.BookmarkMapper;
import app.dto.request.BookmarkRequest;
import app.dto.response.BookmarkResponse;
import app.entity.Bookmark;
import app.repository.BookmarkRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class BookmarkService {
    private final BookmarkRepository bookmarkRepository;
    private final BookmarkMapper bookmarkMapper;

    public BookmarkResponse createBookmark(BookmarkRequest bookmarkRequest) {
        Bookmark bookmark = bookmarkMapper.toBookmarkRequest(bookmarkRequest);
        bookmark.setTimestamp(LocalDateTime.now());
        Bookmark savedBookmark = bookmarkRepository.save(bookmark);
        return bookmarkMapper.toBookmarkResponse(savedBookmark);
    }

    public Page<BookmarkResponse> getPageAllBookmarksByUserId(Long userId, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "timestamp"));
        return bookmarkRepository.findByUserId(userId, pageable)
                .map(bookmarkMapper::toBookmarkResponse);
    }

    public Page<BookmarkResponse> getPageAllBookmarksByPostId(Long postId, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "timestamp"));
        return bookmarkRepository.findByPostId(postId, pageable)
                .map(bookmarkMapper::toBookmarkResponse);
    }

    public boolean deleteBookmark(Long bookmarkId) {
        if (bookmarkRepository.existsById(bookmarkId)) {
            bookmarkRepository.deleteById(bookmarkId);
            return true;
        }
        return false;
    }
}
