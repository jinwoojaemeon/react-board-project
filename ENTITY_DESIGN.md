# 칵테일 랩 프로젝트 엔티티 설계

예시 엔티티 파일(`src/ex`)의 패턴을 참고하여 React 프로젝트에 맞는 엔티티를 설계합니다.

## 📋 엔티티 관계도

```
Member (회원)
  ├── 1:N → Cocktail (칵테일)
  └── 1:N → Like (좋아요)

Cocktail (칵테일)
  └── 1:N → Like (좋아요)
```

## 1. BaseTimeEntity (공통 시간 필드)

```java
package com.cocktaillab.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Getter
@MappedSuperclass
public abstract class BaseTimeEntity {
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

## 2. Member (회원)

```java
package com.cocktaillab.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
@Table(name = "MEMBER")
public class Member extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @Column(length = 50, nullable = false, unique = true)
    private String username;

    @Column(length = 100, nullable = false)
    private String password;

    @Column(length = 30, nullable = false)
    private String nickname;

    @Column(length = 100, nullable = false)
    private String email;

    // 연관관계 매핑
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Cocktail> cocktails = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Like> likes = new ArrayList<>();
}
```

## 3. Cocktail (칵테일)

```java
package com.cocktaillab.entity;

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
    @Column(name = "cocktail_id")
    private Long id;

    @Column(length = 100, nullable = false)
    private String name;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;

    // 재료 목록을 JSON 문자열로 저장 (또는 별도 테이블로 분리 가능)
    @ElementCollection
    @CollectionTable(name = "COCKTAIL_INGREDIENT", joinColumns = @JoinColumn(name = "cocktail_id"))
    @Column(name = "ingredient")
    @Builder.Default
    private List<String> ingredients = new ArrayList<>();

    @Lob
    @Column(columnDefinition = "TEXT")
    private String instructions;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String image; // Base64 이미지 문자열

    // 연관관계 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    // 좋아요 연관관계
    @OneToMany(mappedBy = "cocktail", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Like> likes = new ArrayList<>();
}
```

## 4. Like (좋아요)

```java
package com.cocktaillab.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
@Table(name = "LIKE_TABLE", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"cocktail_id", "member_id"})
})
public class Like extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Long id;

    // 연관관계 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cocktail_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Cocktail cocktail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;
}
```

## 📝 주요 설계 포인트

### 1. BaseTimeEntity 상속
- `Cocktail`, `Like` 엔티티가 `BaseTimeEntity`를 상속받아 `createdAt`, `updatedAt` 자동 관리
- `Member`도 상속받아 일관성 유지

### 2. 연관관계 매핑

#### Member ↔ Cocktail (1:N)
- `Member`: `@OneToMany(mappedBy = "member")`
- `Cocktail`: `@ManyToOne` + `@JoinColumn(name = "member_id")`
- 회원 삭제 시 칵테일도 함께 삭제 (`@OnDelete(CASCADE)`)

#### Member ↔ Like (1:N)
- `Member`: `@OneToMany(mappedBy = "member")`
- `Like`: `@ManyToOne` + `@JoinColumn(name = "member_id")`
- 회원 삭제 시 좋아요도 함께 삭제

#### Cocktail ↔ Like (1:N)
- `Cocktail`: `@OneToMany(mappedBy = "cocktail")`
- `Like`: `@ManyToOne` + `@JoinColumn(name = "cocktail_id")`
- 칵테일 삭제 시 좋아요도 함께 삭제

### 3. 재료(ingredients) 저장 방식

**방법 1: ElementCollection 사용 (현재 설계)**
```java
@ElementCollection
@CollectionTable(name = "COCKTAIL_INGREDIENT", joinColumns = @JoinColumn(name = "cocktail_id"))
@Column(name = "ingredient")
private List<String> ingredients = new ArrayList<>();
```
- 간단하고 직관적
- 재료는 단순 문자열 리스트

**방법 2: 별도 엔티티로 분리 (확장 가능)**
```java
// Ingredient 엔티티 생성
@Entity
public class Ingredient {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String amount;
    private String unit;
}

// Cocktail에서
@OneToMany(mappedBy = "cocktail", cascade = CascadeType.ALL)
private List<Ingredient> ingredients;
```
- 재료에 추가 정보(양, 단위 등) 저장 가능
- 더 복잡하지만 확장성 좋음

### 4. 이미지 저장 방식
- 현재: Base64 문자열로 `@Lob`에 저장
- 대안: 파일 시스템에 저장하고 URL만 저장하거나, 별도 이미지 서버 사용

### 5. 좋아요 중복 방지
```java
@Table(uniqueConstraints = {
    @UniqueConstraint(columnNames = {"cocktail_id", "member_id"})
})
```
- 같은 사용자가 같은 칵테일에 중복 좋아요 방지

## 🔄 연관관계 사용 예시

### Service에서 사용 예시

```java
@Service
public class CocktailService {
    
    private final CocktailRepository cocktailRepository;
    private final MemberRepository memberRepository;
    
    // 칵테일 생성
    public CocktailResponse createCocktail(CocktailRequest request, Long memberId) {
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new NotFoundException("회원을 찾을 수 없습니다."));
        
        Cocktail cocktail = Cocktail.builder()
            .name(request.getName())
            .description(request.getDescription())
            .ingredients(request.getIngredients())
            .instructions(request.getInstructions())
            .image(request.getImage())
            .member(member)  // 연관관계 설정
            .build();
        
        Cocktail saved = cocktailRepository.save(cocktail);
        return CocktailResponse.from(saved);
    }
    
    // 좋아요 추가
    public void addLike(Long cocktailId, Long memberId) {
        Cocktail cocktail = cocktailRepository.findById(cocktailId)
            .orElseThrow(() -> new NotFoundException("칵테일을 찾을 수 없습니다."));
        
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new NotFoundException("회원을 찾을 수 없습니다."));
        
        // 중복 체크
        if (likeRepository.existsByCocktailAndMember(cocktail, member)) {
            throw new ConflictException("이미 좋아요를 누른 칵테일입니다.");
        }
        
        Like like = Like.builder()
            .cocktail(cocktail)  // 연관관계 설정
            .member(member)      // 연관관계 설정
            .build();
        
        likeRepository.save(like);
    }
}
```

### Repository에서 연관관계 활용

```java
@Repository
public interface CocktailRepository extends JpaRepository<Cocktail, Long> {
    
    // 회원 ID로 칵테일 목록 조회
    List<Cocktail> findByMemberId(Long memberId);
    
    // 회원과 함께 조회 (N+1 문제 방지)
    @Query("SELECT c FROM Cocktail c JOIN FETCH c.member WHERE c.member.id = :memberId")
    List<Cocktail> findByMemberIdWithMember(@Param("memberId") Long memberId);
    
    // 좋아요 개수 포함 조회
    @Query("SELECT c, COUNT(l) FROM Cocktail c LEFT JOIN c.likes l GROUP BY c")
    List<Object[]> findAllWithLikeCount();
}

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    
    // 칵테일과 회원으로 좋아요 찾기
    Optional<Like> findByCocktailAndMember(Cocktail cocktail, Member member);
    
    // 존재 여부 확인
    boolean existsByCocktailAndMember(Cocktail cocktail, Member member);
    
    // 칵테일의 좋아요 개수
    long countByCocktailId(Long cocktailId);
    
    // 회원이 좋아요한 칵테일 목록
    List<Like> findByMemberId(Long memberId);
}
```

## ⚠️ 주의사항

### 1. N+1 문제 방지
```java
// ❌ 나쁜 예: N+1 문제 발생
List<Cocktail> cocktails = cocktailRepository.findAll();
// 각 칵테일마다 member를 조회하는 쿼리가 실행됨

// ✅ 좋은 예: JOIN FETCH 사용
@Query("SELECT c FROM Cocktail c JOIN FETCH c.member")
List<Cocktail> findAllWithMember();
```

### 2. 양방향 연관관계 주의
- `mappedBy`를 사용하여 연관관계의 주인을 명확히 지정
- 연관관계의 주인만 외래키를 관리

### 3. Cascade 설정
- `CascadeType.ALL`: 모든 작업 전파
- `orphanRemoval = true`: 부모가 삭제되면 자식도 삭제

## 📁 프로젝트 구조

```
src/main/java/com/cocktaillab/
├── entity/
│   ├── BaseTimeEntity.java
│   ├── Member.java
│   ├── Cocktail.java
│   └── Like.java
├── repository/
│   ├── MemberRepository.java
│   ├── CocktailRepository.java
│   └── LikeRepository.java
├── service/
│   ├── MemberService.java
│   ├── CocktailService.java
│   └── LikeService.java
└── controller/
    ├── MemberController.java
    ├── CocktailController.java
    └── LikeController.java
```

