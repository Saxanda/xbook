package app.controller;

import app.dto.request.BookmarkRequest;
import app.dto.response.BookmarkResponse;
import app.service.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/bookmarks")
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @PostMapping
    public ResponseEntity<BookmarkResponse> createBookmark(@RequestBody BookmarkRequest bookmarkRequest) {
        BookmarkResponse bookmarkResponse = bookmarkService.createBookmark(bookmarkRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(bookmarkResponse);
    }

//    Get methods without pagination (old version).
//    @GetMapping("/user/{userId}")
//    public ResponseEntity<List<BookmarkResponse>> getAllBookmarksByUserId(@PathVariable Long userId) {
//        List<BookmarkResponse> bookmarks = bookmarkService.getAllBookmarksByUserId(userId);
//        return ResponseEntity.ok(bookmarks);
//    }
//
//    @GetMapping("/post/{postId}")
//    public ResponseEntity<List<BookmarkResponse>> getAllBookmarksByPostId(@PathVariable Long postId) {
//        List<BookmarkResponse> bookmarks = bookmarkService.getAllBookmarksByPostId(postId);
//        return ResponseEntity.ok(bookmarks);
//    }

    @GetMapping("/user/{userId}")
    @ResponseStatus(HttpStatus.OK)
    public Page<BookmarkResponse> getPageAllBookmarksByUserId(@PathVariable Long userId,
                                                              @RequestParam(defaultValue = "0") Integer page,
                                                              @RequestParam(defaultValue = "5") Integer size,
                                                              @RequestParam(defaultValue = "createdDate") String sortBy,
                                                              @RequestParam(defaultValue = "desc") String sortDir) {
        return bookmarkService.getPageAllBookmarksByUserId(userId, page, size, sortBy, sortDir);
    }

    @GetMapping("/post/{postId}")
    @ResponseStatus(HttpStatus.OK)
    public Page<BookmarkResponse> getPageAllBookmarksByPostId(@PathVariable Long postId,
                                                              @RequestParam(defaultValue = "0") Integer page,
                                                              @RequestParam(defaultValue = "5") Integer size,
                                                              @RequestParam(defaultValue = "createdDate") String sortBy,
                                                              @RequestParam(defaultValue = "desc") String sortDir) {
        return bookmarkService.getPageAllBookmarksByPostId(postId, page, size, sortBy, sortDir);
    }

    @DeleteMapping("/{bookmarkId}")
    public ResponseEntity<Void> deleteBookmark(@PathVariable Long bookmarkId) {
        boolean isDeleted = bookmarkService.deleteBookmark(bookmarkId);
        if (isDeleted) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
