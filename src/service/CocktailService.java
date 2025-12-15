package com.kh.cocktailLab.service;

import com.kh.cocktailLab.dto.request.CocktailRequest;
import com.kh.cocktailLab.dto.response.CocktailResponse;

import java.util.List;

public interface CocktailService {
    
    // 칵테일 생성
    CocktailResponse createCocktail(CocktailRequest request, Long memberNo);
    
    // 칵테일 전체 조회
    List<CocktailResponse> getAllCocktails(Long currentMemberNo);
    
    // 칵테일 상세 조회
    CocktailResponse getCocktail(Long cocktailNo, Long currentMemberNo);
    
    // 회원별 칵테일 조회
    List<CocktailResponse> getCocktailsByMember(Long memberNo);
    
    // 칵테일 수정
    CocktailResponse updateCocktail(Long cocktailNo, CocktailRequest request, Long memberNo);
    
    // 칵테일 삭제
    void deleteCocktail(Long cocktailNo, Long memberNo);
}

