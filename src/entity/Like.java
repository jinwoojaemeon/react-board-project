package com.kh.cocktailLab.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Entity
@Table(name = "LIKE_TABLE", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"cocktail_no", "member_no"})
})
public class Like extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long likeNo;

    // 연관관계 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cocktail_no", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Cocktail cocktail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_no", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;
}
