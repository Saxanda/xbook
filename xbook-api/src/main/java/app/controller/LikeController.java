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

    @PostMapping("/likes")
    public ResponseEntity<LikeResponse> createLike(@RequestBody LikeRequest likeRequest) {
        LikeResponse createdLike = likeService.createLike(likeRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdLike);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LikeResponse> getLikeById(@PathVariable Long id) {
        LikeResponse like = likeService.getLikeById(id);
        if (like != null) {
            return ResponseEntity.ok(like);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLike(@PathVariable Long id) {
        likeService.deleteLike(id);
        return ResponseEntity.noContent().build();
    }
}

