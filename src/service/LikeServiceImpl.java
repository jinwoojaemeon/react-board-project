package com.kh.cocktailLab.service;

import com.kh.cocktailLab.dto.response.LikeResponse;
import com.kh.cocktailLab.entity.Cocktail;
import com.kh.cocktailLab.entity.Like;
import com.kh.cocktailLab.entity.Member;
import com.kh.cocktailLab.repository.CocktailRepository;
import com.kh.cocktailLab.repository.LikeRepository;
import com.kh.cocktailLab.repository.MemberRepository;
import com.kh.cocktailLab.service.LikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LikeServiceImpl implements LikeService {
    
    private final LikeRepository likeRepository;
    private final CocktailRepository cocktailRepository;
    private final MemberRepository memberRepository;
    
    @Override
    @Transactional
    public LikeResponse toggleLike(Long cocktailNo, Long memberNo) {
        Cocktail cocktail = cocktailRepository.findById(cocktailNo)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, 
                        "칵테일을 찾을 수 없습니다."));
        
        Member member = memberRepository.findById(memberNo)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, 
                        "회원을 찾을 수 없습니다."));
        
        // 이미 좋아요 했는지 확인
        boolean exists = likeRepository.existsByCocktailAndMember(cocktail, member);
        
        if (exists) {
            // 좋아요 취소
            Like like = likeRepository.findByCocktailAndMember(cocktail, member)
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND, 
                            "좋아요를 찾을 수 없습니다."));
            likeRepository.delete(like);
            
            Long likeCount = likeRepository.countByCocktailCocktailNo(cocktailNo);
            
            return LikeResponse.builder()
                    .message("좋아요가 취소되었습니다.")
                    .likeCount(likeCount)
                    .isLiked(false)
                    .build();
        } else {
            // 좋아요 추가
            Like like = Like.builder()
                    .cocktail(cocktail)
                    .member(member)
                    .build();
            likeRepository.save(like);
            
            Long likeCount = likeRepository.countByCocktailCocktailNo(cocktailNo);
            
            return LikeResponse.builder()
                    .message("좋아요가 추가되었습니다.")
                    .likeCount(likeCount)
                    .isLiked(true)
                    .build();
        }
    }
    
    @Override
    public Long getLikeCount(Long cocktailNo) {
        return likeRepository.countByCocktailCocktailNo(cocktailNo);
    }
    
    @Override
    public Boolean isLikedByMember(Long cocktailNo, Long memberNo) {
        if (memberNo == null) {
            return false;
        }
        return likeRepository.existsByCocktailCocktailNoAndMemberMemberNo(cocktailNo, memberNo);
    }
}

