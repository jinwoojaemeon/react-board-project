package com.kh.cocktailLab.controller;

import com.kh.cocktailLab.dto.request.CocktailRequest;
import com.kh.cocktailLab.dto.response.ApiResponse;
import com.kh.cocktailLab.dto.response.CocktailResponse;
import com.kh.cocktailLab.service.CocktailService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cocktails")
@RequiredArgsConstructor
public class CocktailController {
    
    private final CocktailService cocktailService;
    
    // 칵테일 생성
    @PostMapping
    public ResponseEntity<ApiResponse<CocktailResponse>> createCocktail(
            @Valid @RequestBody CocktailRequest request,
            @RequestHeader(value = "X-Member-No", required = false) Long memberNo) {
        
        if (memberNo == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("로그인이 필요합니다."));
        }
        
        CocktailResponse response = cocktailService.createCocktail(request, memberNo);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("칵테일이 생성되었습니다.", response));
    }
    
    // 칵테일 전체 조회
    @GetMapping
    public ResponseEntity<ApiResponse<List<CocktailResponse>>> getAllCocktails(
            @RequestHeader(value = "X-Member-No", required = false) Long memberNo) {
        
        List<CocktailResponse> responses = cocktailService.getAllCocktails(memberNo);
        return ResponseEntity.ok(ApiResponse.success(responses));
    }
    
    // 칵테일 상세 조회
    @GetMapping("/{cocktailNo}")
    public ResponseEntity<ApiResponse<CocktailResponse>> getCocktail(
            @PathVariable Long cocktailNo,
            @RequestHeader(value = "X-Member-No", required = false) Long memberNo) {
        
        CocktailResponse response = cocktailService.getCocktail(cocktailNo, memberNo);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
    
    // 회원별 칵테일 조회
    @GetMapping("/members/{memberNo}")
    public ResponseEntity<ApiResponse<List<CocktailResponse>>> getCocktailsByMember(
            @PathVariable Long memberNo) {
        
        List<CocktailResponse> responses = cocktailService.getCocktailsByMember(memberNo);
        return ResponseEntity.ok(ApiResponse.success(responses));
    }
    
    // 칵테일 수정
    @PutMapping("/{cocktailNo}")
    public ResponseEntity<ApiResponse<CocktailResponse>> updateCocktail(
            @PathVariable Long cocktailNo,
            @Valid @RequestBody CocktailRequest request,
            @RequestHeader(value = "X-Member-No", required = false) Long memberNo) {
        
        if (memberNo == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("로그인이 필요합니다."));
        }
        
        CocktailResponse response = cocktailService.updateCocktail(cocktailNo, request, memberNo);
        return ResponseEntity.ok(ApiResponse.success("칵테일이 수정되었습니다.", response));
    }
    
    // 칵테일 삭제
    @DeleteMapping("/{cocktailNo}")
    public ResponseEntity<ApiResponse<Void>> deleteCocktail(
            @PathVariable Long cocktailNo,
            @RequestHeader(value = "X-Member-No", required = false) Long memberNo) {
        
        if (memberNo == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("로그인이 필요합니다."));
        }
        
        cocktailService.deleteCocktail(cocktailNo, memberNo);
        return ResponseEntity.ok(ApiResponse.success("칵테일이 삭제되었습니다.", null));
    }
}

