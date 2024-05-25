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

    public Page<BookmarkResponse> getPageAllBookmarksByUserId(Long userId, Integer page, Integer size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        return bookmarkRepository.findByUserId(userId, pageable)
                .map(bookmarkMapper::toBookmarkResponse);
    }

    public Page<BookmarkResponse> getPageAllBookmarksByPostId(Long postId, Integer page, Integer size, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
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
