package com.kh.cocktailLab.dto.response;

import com.kh.cocktailLab.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberResponse {
    
    private Long memberNo;
    private String memberId; // 로그인 아이디
    private String nickname;
    private String email;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Entity를 DTO로 변환
    public static MemberResponse from(Member member) {
        return MemberResponse.builder()
                .memberNo(member.getMemberNo())
                .memberId(member.getMemberId())
                .nickname(member.getNickname())
                .email(member.getEmail())
                .createdAt(member.getCreatedAt())
                .updatedAt(member.getUpdatedAt())
                .build();
    }
    
    // 로그인 응답용 (비밀번호 제외)
    public static MemberResponse loginResponse(Member member) {
        return MemberResponse.builder()
                .memberNo(member.getMemberNo())
                .memberId(member.getMemberId())
                .nickname(member.getNickname())
                .build();
    }
}

