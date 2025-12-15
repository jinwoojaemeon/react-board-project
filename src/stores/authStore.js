import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const API_BASE_URL = '/api'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null, // { memberNo: Long, memberId: String, nickname: String }

      // 아이디 중복 체크
      checkUsernameExists: async (memberId) => {
        try {
          const response = await fetch(`${API_BASE_URL}/members/check-memberId?memberId=${encodeURIComponent(memberId)}`)
          const data = await response.json()
          
          if (data.success) {
            return !data.data.available // available이 false면 존재함
          }
          return false
        } catch (error) {
          console.error('아이디 중복 체크 실패:', error)
          return false
        }
      },

      // 회원가입
      signup: async (userData) => {
        const { username: memberId, password: userPwd, nickname, email } = userData
        
        try {
          const response = await fetch(`${API_BASE_URL}/members`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              memberId,
              userPwd,
              nickname,
              email
            })
          })

          const data = await response.json()

          if (response.ok && data.success) {
            const memberData = data.data
            set({
              user: {
                memberNo: memberData.memberNo,
                memberId: memberData.memberId,
                nickname: memberData.nickname
              }
            })
            return { success: true }
          } else {
            return { success: false, error: data.message || '회원가입에 실패했습니다.' }
          }
        } catch (error) {
          console.error('회원가입 실패:', error)
          return { success: false, error: '회원가입 중 오류가 발생했습니다.' }
        }
      },

      // 로그인
      login: async (memberId, userPwd) => {
        try {
          const response = await fetch(`${API_BASE_URL}/members/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              memberId,
              userPwd
            })
          })

          const data = await response.json()

          if (response.ok && data.success) {
            const memberData = data.data
            set({
              user: {
                memberNo: memberData.memberNo,
                memberId: memberData.memberId,
                nickname: memberData.nickname
              }
            })
            return { success: true }
          } else {
            return { success: false, error: data.message || '아이디 또는 비밀번호가 올바르지 않습니다.' }
          }
        } catch (error) {
          console.error('로그인 실패:', error)
          return { success: false, error: '로그인 중 오류가 발생했습니다.' }
        }
      },

      // 로그아웃
      logout: () => set({ user: null }),
    }),
    {
      name: 'cocktail-lab-auth',
    }
  )
)
