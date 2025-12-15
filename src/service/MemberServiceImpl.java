package com.kh.cocktailLab.service;

import com.kh.cocktailLab.dto.request.LoginRequest;
import com.kh.cocktailLab.dto.request.SignupRequest;
import com.kh.cocktailLab.dto.response.MemberResponse;
import com.kh.cocktailLab.entity.Member;
import com.kh.cocktailLab.repository.MemberRepository;
import com.kh.cocktailLab.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {
    
    private final MemberRepository memberRepository;
    
    @Override
    @Transactional
    public MemberResponse signup(SignupRequest request) {
        // 아이디 중복 체크
        if (memberRepository.existsByMemberId(request.getMemberId())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "이미 사용 중인 아이디입니다.");
        }
        
        // 이메일 중복 체크
        if (memberRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "이미 사용 중인 이메일입니다.");
        }
        
        // 회원 생성
        Member member = Member.builder()
                .memberId(request.getMemberId())
                .userPwd(request.getUserPwd()) // 실제로는 BCrypt로 해시화해야 함
                .nickname(request.getNickname())
                .email(request.getEmail())
                .build();
        
        Member savedMember = memberRepository.save(member);
        
        return MemberResponse.from(savedMember);
    }
    
    @Override
    public MemberResponse login(LoginRequest request) {
        Member member = memberRepository.findByMemberId(request.getMemberId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST, 
                        "아이디 또는 비밀번호가 올바르지 않습니다."));
        
        // 비밀번호 확인 (실제로는 BCrypt로 비교해야 함)
        if (!member.getUserPwd().equals(request.getUserPwd())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, 
                    "아이디 또는 비밀번호가 올바르지 않습니다.");
        }
        
        return MemberResponse.loginResponse(member);
    }
    
    @Override
    public boolean checkMemberIdExists(String memberId) {
        return memberRepository.existsByMemberId(memberId);
    }
    
    @Override
    public MemberResponse getMember(Long memberNo) {
        Member member = memberRepository.findById(memberNo)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, 
                        "회원을 찾을 수 없습니다."));
        
        return MemberResponse.from(member);
    }
}

