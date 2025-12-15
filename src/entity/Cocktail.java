package com.kh.cocktailLab.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
@Table(name = "COCKTAIL")
public class Cocktail extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long cocktailNo;

    @Column(length = 100, nullable = false)
    private String cocktailName;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    // 재료 목록을 JSON 문자열로 저장 (또는 별도 테이블로 분리 가능)
    @ElementCollection
    @CollectionTable(name = "COCKTAIL_INGREDIENT", joinColumns = @JoinColumn(name = "cocktail_no"))
    @Column(name = "ingredient")
    @Builder.Default
    private List<String> ingredients = new ArrayList<>();

    @Lob
    @Column(columnDefinition = "TEXT")
    private String instructions;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String cocktailImagePath;

    // 연관관계 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_no", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    // 좋아요 연관관계
    @OneToMany(mappedBy = "cocktail", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Like> likes = new ArrayList<>();
    
    // 칵테일 정보 업데이트 메서드
    // createdAt은 @Column(updatable = false)로 자동 유지되고,
    // updatedAt은 @UpdateTimestamp로 자동 업데이트됩니다.
    public void updateCocktail(String cocktailName, String description, 
                               List<String> ingredients, String instructions, 
                               String cocktailImagePath) {
        this.cocktailName = cocktailName;
        this.description = description;
        this.ingredients = ingredients != null ? new ArrayList<>(ingredients) : new ArrayList<>();
        this.instructions = instructions;
        this.cocktailImagePath = cocktailImagePath;
    }
}

