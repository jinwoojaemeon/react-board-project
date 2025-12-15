package com.kh.cocktailLab.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
@Table(name = "MEMBER")
public class Member extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberNo;

    @Column(length = 50, nullable = false, unique = true)
    private String memberId;

    @Column(length = 100, nullable = false)
    private String userPwd;

    @Column(length = 30, nullable = false)
    private String nickname;

    @Column(length = 100, nullable = false)
    private String email;

    // 연관관계 매핑
    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Cocktail> cocktails = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Like> likes = new ArrayList<>();
}

