package com.kh.cocktailLab.service;

import com.kh.cocktailLab.dto.request.LoginRequest;
import com.kh.cocktailLab.dto.request.SignupRequest;
import com.kh.cocktailLab.dto.response.MemberResponse;

public interface MemberService {
    
    // 회원가입
    MemberResponse signup(SignupRequest request);
    
    // 로그인
    MemberResponse login(LoginRequest request);
    
    // 아이디 중복 체크
    boolean checkMemberIdExists(String memberId);
    
    // 회원 번호로 조회
    MemberResponse getMember(Long memberNo);
}

