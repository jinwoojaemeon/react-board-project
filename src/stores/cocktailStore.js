import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCocktailStore = create(
  persist(
    (set, get) => ({
      customCocktails: [],
      likedCocktails: {}, // { userId: [id1, id2, ...] } - 사용자별 좋아요 목록
      likeHistory: {}, // { id: [timestamp1, timestamp2, ...] } - 좋아요를 받은 시간 기록 (전체)
      
      addCocktail: (cocktail, userId) => {
        const newCocktail = {
          ...cocktail,
          id: Date.now(),
          userId: userId, // 유저 ID 추가
          createdAt: Date.now()
        }
        
        set((state) => ({
          customCocktails: [...state.customCocktails, newCocktail]
        }))
      },
      
      updateCocktail: (id, updatedCocktail) => {
        set((state) => {
          const idString = String(id)
          return {
            customCocktails: state.customCocktails.map(cocktail => 
              String(cocktail.id) === idString 
                ? { ...cocktail, ...updatedCocktail, updatedAt: Date.now() }
                : cocktail
            )
          }
        })
      },
      
      deleteCocktail: (id) => {
        set((state) => {
          const newLikeHistory = { ...state.likeHistory }
          delete newLikeHistory[id]
          
          // 모든 사용자의 likedCocktails에서 해당 id 제거
          const newLikedCocktails = { ...state.likedCocktails }
          Object.keys(newLikedCocktails).forEach(userId => {
            // 배열인지 확인하고 필터링 (타입 안전성을 위해 느슨한 비교 사용)
            if (Array.isArray(newLikedCocktails[userId])) {
              newLikedCocktails[userId] = newLikedCocktails[userId].filter(likedId => String(likedId) !== String(id))
              if (newLikedCocktails[userId].length === 0) {
                delete newLikedCocktails[userId]
              }
            }
          })
          
          // 타입 안전성을 위해 문자열로 변환하여 비교
          const idString = String(id)
          return {
            customCocktails: state.customCocktails.filter(cocktail => String(cocktail.id) !== idString),
            likedCocktails: newLikedCocktails,
            likeHistory: newLikeHistory
          }
        })
      },
      
      // 현재 로그인한 유저의 칵테일만 가져오기
      getUserCocktails: (userId) => {
        return get().customCocktails.filter(cocktail => cocktail.userId === userId)
      },
      
      // 사용자별 좋아요 상태 확인
      isLikedByUser: (id, userId) => {
        if (!userId) return false
        const state = get()
        return (state.likedCocktails[userId] && state.likedCocktails[userId].includes(id)) || false
      },
      
      toggleLike: (id, userId) => {
        if (!userId) return // 로그인하지 않은 사용자는 좋아요 불가
        
        set((state) => {
          const userLikedCocktails = state.likedCocktails[userId] || []
          const isLiked = userLikedCocktails.includes(id)
          const now = Date.now()
          const newLikeHistory = { ...state.likeHistory }
          const newLikedCocktails = { ...state.likedCocktails }
          
          if (isLiked) {
            // 좋아요 취소
            newLikedCocktails[userId] = userLikedCocktails.filter(likedId => likedId !== id)
            if (newLikedCocktails[userId].length === 0) {
              delete newLikedCocktails[userId]
            }
            
            // likeHistory에서 가장 최근 타임스탬프 제거
            if (newLikeHistory[id] && newLikeHistory[id].length > 0) {
              newLikeHistory[id] = newLikeHistory[id].slice(0, -1)
              if (newLikeHistory[id].length === 0) {
                delete newLikeHistory[id]
              }
            }
          } else {
            // 좋아요 추가
            if (!newLikedCocktails[userId]) {
              newLikedCocktails[userId] = []
            }
            newLikedCocktails[userId] = [...newLikedCocktails[userId], id]
            
            // likeHistory에 타임스탬프 추가
            if (!newLikeHistory[id]) {
              newLikeHistory[id] = []
            }
            newLikeHistory[id] = [...newLikeHistory[id], now]
          }
          
          return {
            likedCocktails: newLikedCocktails,
            likeHistory: newLikeHistory
          }
        })
      },
      
      getLikeCount: (id) => {
        const state = get()
        return state.likeHistory[id] ? state.likeHistory[id].length : 0
      }
    }),
    {
      name: 'cocktail-lab-cocktails', // persist가 자동으로 이 키로 로컬스토리지에 저장
    }
  )
)

