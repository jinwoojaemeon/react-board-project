package com.kh.cocktailLab.repository;

import com.kh.cocktailLab.entity.Cocktail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CocktailRepository extends JpaRepository<Cocktail, Long> {
    
    // 회원 번호로 칵테일 목록 조회
    List<Cocktail> findByMemberMemberNo(Long memberNo);
    
    // 회원과 함께 조회 (N+1 문제 방지)
    @Query("SELECT c FROM Cocktail c JOIN FETCH c.member WHERE c.member.memberNo = :memberNo")
    List<Cocktail> findByMemberNoWithMember(@Param("memberNo") Long memberNo);
    
    // 칵테일 이름으로 검색
    List<Cocktail> findByCocktailNameContaining(String cocktailName);
    
    // 좋아요 개수 포함 전체 조회
    @Query("SELECT c FROM Cocktail c LEFT JOIN FETCH c.likes")
    List<Cocktail> findAllWithLikes();
}

