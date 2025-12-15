package com.kh.cocktailLab.dto.response;

import com.kh.cocktailLab.entity.Cocktail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CocktailResponse {
    
    private Long cocktailNo;
    private String cocktailName;
    private String description;
    private List<String> ingredients;
    private String instructions;
    private String cocktailImagePath;
    private Long memberNo; // 작성자 번호
    private String memberId; // 작성자 아이디
    private String nickname; // 작성자 닉네임
    private Long likeCount; // 좋아요 개수
    private Boolean isLiked; // 현재 사용자가 좋아요 했는지 여부 (선택적)
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Entity를 DTO로 변환
    public static CocktailResponse from(Cocktail cocktail) {
        return CocktailResponse.builder()
                .cocktailNo(cocktail.getCocktailNo())
                .cocktailName(cocktail.getCocktailName())
                .description(cocktail.getDescription())
                .ingredients(cocktail.getIngredients())
                .instructions(cocktail.getInstructions())
                .cocktailImagePath(cocktail.getCocktailImagePath())
                .memberNo(cocktail.getMember().getMemberNo())
                .memberId(cocktail.getMember().getMemberId())
                .nickname(cocktail.getMember().getNickname())
                .likeCount((long) cocktail.getLikes().size())
                .createdAt(cocktail.getCreatedAt())
                .updatedAt(cocktail.getUpdatedAt())
                .build();
    }
    
    // 좋아요 정보 포함 변환
    public static CocktailResponse fromWithLikeInfo(Cocktail cocktail, Long likeCount, Boolean isLiked) {
        return CocktailResponse.builder()
                .cocktailNo(cocktail.getCocktailNo())
                .cocktailName(cocktail.getCocktailName())
                .description(cocktail.getDescription())
                .ingredients(cocktail.getIngredients())
                .instructions(cocktail.getInstructions())
                .cocktailImagePath(cocktail.getCocktailImagePath())
                .memberNo(cocktail.getMember().getMemberNo())
                .memberId(cocktail.getMember().getMemberId())
                .nickname(cocktail.getMember().getNickname())
                .likeCount(likeCount)
                .isLiked(isLiked)
                .createdAt(cocktail.getCreatedAt())
                .updatedAt(cocktail.getUpdatedAt())
                .build();
    }
}

