import { create } from 'zustand'

export const useCocktailStore = create((set) => ({
  customCocktails: [],
  likedCocktails: [], // [id1, id2, ...]
  likeHistory: {}, // { id: [timestamp1, timestamp2, ...] } - 좋아요를 받은 시간 기록
  addCocktail: (cocktail) => set((state) => ({
    customCocktails: [...state.customCocktails, { ...cocktail, id: Date.now(), createdAt: Date.now() }]
  })),
  deleteCocktail: (id) => set((state) => {
    const newLikeHistory = { ...state.likeHistory }
    delete newLikeHistory[id]
    return {
      customCocktails: state.customCocktails.filter(cocktail => cocktail.id !== id),
      likedCocktails: state.likedCocktails.filter(likedId => likedId !== id),
      likeHistory: newLikeHistory
    }
  }),
  toggleLike: (id) => set((state) => {
    const isLiked = state.likedCocktails.includes(id)
    const now = Date.now()
    const newLikeHistory = { ...state.likeHistory }
    
    if (isLiked) {
      // 좋아요 취소 - 가장 최근 타임스탬프 제거
      if (newLikeHistory[id] && newLikeHistory[id].length > 0) {
        newLikeHistory[id] = newLikeHistory[id].slice(0, -1)
        if (newLikeHistory[id].length === 0) {
          delete newLikeHistory[id]
        }
      }
      return {
        likedCocktails: state.likedCocktails.filter(likedId => likedId !== id),
        likeHistory: newLikeHistory
      }
    } else {
      // 좋아요 추가
      if (!newLikeHistory[id]) {
        newLikeHistory[id] = []
      }
      newLikeHistory[id] = [...newLikeHistory[id], now]
      return {
        likedCocktails: [...state.likedCocktails, id],
        likeHistory: newLikeHistory
      }
    }
  }),
  getLikeCount: (id) => {
    const state = useCocktailStore.getState()
    return state.likeHistory[id] ? state.likeHistory[id].length : 0
  }
}))

