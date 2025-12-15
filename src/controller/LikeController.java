package com.kh.cocktailLab.controller;

import com.kh.cocktailLab.dto.response.ApiResponse;
import com.kh.cocktailLab.dto.response.LikeResponse;
import com.kh.cocktailLab.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/cocktails")
@RequiredArgsConstructor
public class LikeController {
    
    private final LikeService likeService;
    
    // 좋아요 토글
    @PostMapping("/{cocktailNo}/likes")
    public ResponseEntity<ApiResponse<LikeResponse>> toggleLike(
            @PathVariable Long cocktailNo,
            @RequestHeader(value = "X-Member-No", required = false) Long memberNo) {
        
        if (memberNo == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("로그인이 필요합니다."));
        }
        
        LikeResponse response = likeService.toggleLike(cocktailNo, memberNo);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    // 좋아요 개수 조회
    @GetMapping("/{cocktailNo}/likes")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getLikeCount(@PathVariable Long cocktailNo) {
        Long likeCount = likeService.getLikeCount(cocktailNo);
        Map<String, Long> result = new HashMap<>();
        result.put("likeCount", likeCount);
        
        return ResponseEntity.ok(ApiResponse.success(result));
    }
    
    // 사용자가 좋아요 했는지 확인
    @GetMapping("/{cocktailNo}/likes/check")
    public ResponseEntity<ApiResponse<Map<String, Boolean>>> checkLiked(
            @PathVariable Long cocktailNo,
            @RequestHeader(value = "X-Member-No", required = false) Long memberNo) {
        
        Boolean isLiked = likeService.isLikedByMember(cocktailNo, memberNo);
        Map<String, Boolean> result = new HashMap<>();
        result.put("isLiked", isLiked != null && isLiked);
        
        return ResponseEntity.ok(ApiResponse.success(result));
    }
}

