package com.kh.cocktailLab.repository;

import com.kh.cocktailLab.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    
    // 로그인 아이디로 회원 찾기
    Optional<Member> findByMemberId(String memberId);
    
    // 로그인 아이디 중복 체크
    boolean existsByMemberId(String memberId);
    
    // 이메일로 회원 찾기
    Optional<Member> findByEmail(String email);
    
    // 이메일 중복 체크
    boolean existsByEmail(String email);
}

