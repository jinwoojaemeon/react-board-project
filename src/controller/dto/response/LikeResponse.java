package com.kh.cocktailLab.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LikeResponse {
    
    private String message;
    private Long likeCount;
    private Boolean isLiked;
}

