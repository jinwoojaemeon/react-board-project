package com.kh.cocktailLab.dto.request;

import com.kh.cocktailLab.entity.Cocktail;
import com.kh.cocktailLab.entity.Member;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CocktailRequest {
    
    @NotBlank(message = "칵테일 이름은 필수입니다.")
    private String cocktailName;
    
    private String description;
    
    @NotEmpty(message = "재료는 최소 1개 이상 필요합니다.")
    private List<String> ingredients;
    
    private String instructions;
    
    private String cocktailImagePath; // Base64 이미지 문자열 또는 URL
    
    // DTO에서 Builder를 사용하여 엔티티 생성
    public Cocktail toEntity(Member member) {
        return Cocktail.builder()
                .cocktailName(this.cocktailName)
                .description(this.description)
                .ingredients(this.ingredients != null ? new ArrayList<>(this.ingredients) : new ArrayList<>())
                .instructions(this.instructions)
                .cocktailImagePath(this.cocktailImagePath)
                .member(member)
                .build();
    }
    
    // DTO에서 Builder를 사용하여 기존 엔티티 업데이트용 새 엔티티 생성
    public Cocktail toUpdateEntity(Cocktail existingCocktail) {
        return Cocktail.builder()
                .cocktailNo(existingCocktail.getCocktailNo())
                .cocktailName(this.cocktailName)
                .description(this.description)
                .ingredients(this.ingredients != null ? new ArrayList<>(this.ingredients) : new ArrayList<>())
                .instructions(this.instructions)
                .cocktailImagePath(this.cocktailImagePath)
                .member(existingCocktail.getMember())
                .likes(existingCocktail.getLikes())
                .build();
        // createdAt과 updatedAt은 BaseTimeEntity에서 자동 관리되므로 Builder에 포함하지 않음
    }
}

