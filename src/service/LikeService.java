package com.kh.cocktailLab.service;

import com.kh.cocktailLab.dto.response.LikeResponse;

public interface LikeService {
    
    // 좋아요 토글
    LikeResponse toggleLike(Long cocktailNo, Long memberNo);
    
    // 좋아요 개수 조회
    Long getLikeCount(Long cocktailNo);
    
    // 사용자가 좋아요 했는지 확인
    Boolean isLikedByMember(Long cocktailNo, Long memberNo);
}

