import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      users: [], // 회원가입한 유저 목록

      // 아이디 중복 체크
      checkUsernameExists: (username) => {
        const users = get().users
        return users.some(user => user.username === username)
      },

      // 회원가입
      signup: (userData) => {
        const { username, password, nickname, email } = userData
        
        // 아이디 중복 체크
        if (get().checkUsernameExists(username)) {
          return { success: false, error: '이미 사용 중인 아이디입니다.' }
        }

        const newUser = {
          id: Date.now(),
          username,
          password, // 실제로는 해시화해야 하지만 간단하게 저장
          nickname,
          email,
          createdAt: Date.now()
        }

        set((state) => ({
          users: [...state.users, newUser],
          user: { id: newUser.id, username: newUser.username, nickname: newUser.nickname }
        }))
        
        return { success: true }
      },

      // 로그인
      login: (username, password) => {
        const users = get().users
        const user = users.find(u => u.username === username && u.password === password)
        
        if (!user) {
          return { success: false, error: '아이디 또는 비밀번호가 올바르지 않습니다.' }
        }

        set({ 
          user: { 
            id: user.id, 
            username: user.username, 
            nickname: user.nickname 
          }
        })
        
        return { success: true }
      },

      // 로그아웃
      logout: () => set({ user: null }),
    }),
    {
      name: 'cocktail-lab-auth', // persist가 자동으로 이 키로 로컬스토리지에 저장
    }
  )
)

