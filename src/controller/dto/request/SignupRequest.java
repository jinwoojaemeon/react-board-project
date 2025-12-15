package com.kh.cocktailLab.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequest {
    
    @NotBlank(message = "아이디는 필수입니다.")
    @Size(min = 3, max = 50, message = "아이디는 3자 이상 50자 이하여야 합니다.")
    private String memberId; // 로그인 아이디
    
    @NotBlank(message = "비밀번호는 필수입니다.")
    @Size(min = 4, max = 100, message = "비밀번호는 4자 이상 100자 이하여야 합니다.")
    private String userPwd;
    
    @NotBlank(message = "닉네임은 필수입니다.")
    @Size(max = 30, message = "닉네임은 30자 이하여야 합니다.")
    private String nickname;
    
    @NotBlank(message = "이메일은 필수입니다.")
    @Email(message = "올바른 이메일 형식이 아닙니다.")
    @Size(max = 100, message = "이메일은 100자 이하여야 합니다.")
    private String email;
}

