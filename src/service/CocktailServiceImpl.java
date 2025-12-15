package com.kh.cocktailLab.service;

import com.kh.cocktailLab.dto.request.CocktailRequest;
import com.kh.cocktailLab.dto.response.CocktailResponse;
import com.kh.cocktailLab.entity.Cocktail;
import com.kh.cocktailLab.entity.Member;
import com.kh.cocktailLab.repository.CocktailRepository;
import com.kh.cocktailLab.repository.LikeRepository;
import com.kh.cocktailLab.repository.MemberRepository;
import com.kh.cocktailLab.service.CocktailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CocktailServiceImpl implements CocktailService {
    
    private final CocktailRepository cocktailRepository;
    private final MemberRepository memberRepository;
    private final LikeRepository likeRepository;
    
    @Override
    @Transactional
    public CocktailResponse createCocktail(CocktailRequest request, Long memberNo) {
        Member member = memberRepository.findById(memberNo)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, 
                        "회원을 찾을 수 없습니다."));
        
        // DTO에서 Builder를 사용하여 엔티티 생성
        Cocktail cocktail = request.toEntity(member);
        
        Cocktail savedCocktail = cocktailRepository.save(cocktail);
        
        return CocktailResponse.from(savedCocktail);
    }
    
    @Override
    public List<CocktailResponse> getAllCocktails(Long currentMemberNo) {
        List<Cocktail> cocktails = cocktailRepository.findAllWithLikes();
        
        return cocktails.stream()
                .map(cocktail -> {
                    Long likeCount = likeRepository.countByCocktailCocktailNo(cocktail.getCocktailNo());
                    Boolean isLiked = currentMemberNo != null && 
                            likeRepository.existsByCocktailCocktailNoAndMemberMemberNo(
                                    cocktail.getCocktailNo(), currentMemberNo);
                    return CocktailResponse.fromWithLikeInfo(cocktail, likeCount, isLiked);
                })
                .collect(Collectors.toList());
    }
    
    @Override
    public CocktailResponse getCocktail(Long cocktailNo, Long currentMemberNo) {
        Cocktail cocktail = cocktailRepository.findById(cocktailNo)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, 
                        "칵테일을 찾을 수 없습니다."));
        
        Long likeCount = likeRepository.countByCocktailCocktailNo(cocktailNo);
        Boolean isLiked = currentMemberNo != null && 
                likeRepository.existsByCocktailCocktailNoAndMemberMemberNo(cocktailNo, currentMemberNo);
        
        return CocktailResponse.fromWithLikeInfo(cocktail, likeCount, isLiked);
    }
    
    @Override
    public List<CocktailResponse> getCocktailsByMember(Long memberNo) {
        List<Cocktail> cocktails = cocktailRepository.findByMemberNoWithMember(memberNo);
        
        return cocktails.stream()
                .map(CocktailResponse::from)
                .collect(Collectors.toList());
    }
    
    @Override
    @Transactional
    public CocktailResponse updateCocktail(Long cocktailNo, CocktailRequest request, Long memberNo) {
        Cocktail cocktail = cocktailRepository.findById(cocktailNo)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, 
                        "칵테일을 찾을 수 없습니다."));
        
        // 작성자 확인
        if (!cocktail.getMember().getMemberNo().equals(memberNo)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, 
                    "본인이 작성한 칵테일만 수정할 수 있습니다.");
        }
        
        // DTO에서 Builder를 사용하여 업데이트용 엔티티 생성
        // createdAt과 updatedAt은 BaseTimeEntity에서 자동 관리됨
        Cocktail updatedCocktail = request.toUpdateEntity(cocktail);
        updatedCocktail = cocktailRepository.save(updatedCocktail);
        
        return CocktailResponse.from(updatedCocktail);
    }
    
    @Override
    @Transactional
    public void deleteCocktail(Long cocktailNo, Long memberNo) {
        Cocktail cocktail = cocktailRepository.findById(cocktailNo)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, 
                        "칵테일을 찾을 수 없습니다."));
        
        // 작성자 확인
        if (!cocktail.getMember().getMemberNo().equals(memberNo)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, 
                    "본인이 작성한 칵테일만 삭제할 수 있습니다.");
        }
        
        cocktailRepository.delete(cocktail);
    }
}

