package com.kh.cocktailLab.repository;

import com.kh.cocktailLab.entity.Cocktail;
import com.kh.cocktailLab.entity.Like;
import com.kh.cocktailLab.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {
    
    // 칵테일과 회원으로 좋아요 찾기
    Optional<Like> findByCocktailAndMember(Cocktail cocktail, Member member);
    
    // 존재 여부 확인
    boolean existsByCocktailAndMember(Cocktail cocktail, Member member);
    
    // 칵테일 번호와 회원 번호로 존재 여부 확인
    boolean existsByCocktailCocktailNoAndMemberMemberNo(Long cocktailNo, Long memberNo);
    
    // 칵테일의 좋아요 개수
    long countByCocktailCocktailNo(Long cocktailNo);
    
    // 회원이 좋아요한 칵테일 목록
    List<Like> findByMemberMemberNo(Long memberNo);
    
    // 칵테일의 좋아요 목록
    List<Like> findByCocktailCocktailNo(Long cocktailNo);
}

