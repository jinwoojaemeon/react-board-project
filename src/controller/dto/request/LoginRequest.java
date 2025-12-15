package com.kh.cocktailLab.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    
    @NotBlank(message = "아이디는 필수입니다.")
    private String memberId; // 로그인 아이디
    
    @NotBlank(message = "비밀번호는 필수입니다.")
    private String userPwd;
}

