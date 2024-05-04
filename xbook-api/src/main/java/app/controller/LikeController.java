package app.controller;

import app.dto.request.LikeRequest;
import app.dto.response.LikeResponse;
import app.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/likes")
@RequiredArgsConstructor
public class LikeController {

    private final LikeService likeService;

    @PostMapping("/like")
    public ResponseEntity<String> createLike(@RequestBody LikeRequest likeRequest) {
        likeService.addLike(likeRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body("Like added");
    }

    @DeleteMapping("/remove/{likeId}")
    public ResponseEntity<Void> deleteLike(@PathVariable Long likeId) {
        likeService.removeLike(likeId);
        return ResponseEntity.noContent().build();
    }
}

