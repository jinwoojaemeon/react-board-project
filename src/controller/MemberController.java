package com.kh.cocktailLab.controller;

import com.kh.cocktailLab.dto.request.LoginRequest;
import com.kh.cocktailLab.dto.request.SignupRequest;
import com.kh.cocktailLab.dto.response.ApiResponse;
import com.kh.cocktailLab.dto.response.MemberResponse;
import com.kh.cocktailLab.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
public class MemberController {
    
    private final MemberService memberService;
    
    // 회원가입
    @PostMapping
    public ResponseEntity<ApiResponse<MemberResponse>> signup(@Valid @RequestBody SignupRequest request) {
        MemberResponse response = memberService.signup(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("회원가입이 완료되었습니다.", response));
    }
    
    // 로그인
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<MemberResponse>> login(@Valid @RequestBody LoginRequest request) {
        MemberResponse response = memberService.login(request);
        return ResponseEntity.ok(ApiResponse.success("로그인 성공", response));
    }
    
    // 아이디 중복 체크
    @GetMapping("/check-memberId")
    public ResponseEntity<ApiResponse<Map<String, Boolean>>> checkMemberId(@RequestParam String memberId) {
        boolean exists = memberService.checkMemberIdExists(memberId);
        Map<String, Boolean> result = new HashMap<>();
        result.put("available", !exists);
        
        if (exists) {
            return ResponseEntity.ok(ApiResponse.success("이미 사용 중인 아이디입니다.", result));
        } else {
            return ResponseEntity.ok(ApiResponse.success("사용 가능한 아이디입니다.", result));
        }
    }
    
    // 회원 정보 조회
    @GetMapping("/{memberNo}")
    public ResponseEntity<ApiResponse<MemberResponse>> getMember(@PathVariable Long memberNo) {
        MemberResponse response = memberService.getMember(memberNo);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}

