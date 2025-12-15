import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const API_BASE_URL = '/api'

// API 헬퍼 함수
const apiRequest = async (url, options = {}) => {
  const user = JSON.parse(localStorage.getItem('cocktail-lab-auth') || '{}')?.state?.user
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }
  
  if (user?.memberNo) {
    headers['X-Member-No'] = user.memberNo.toString()
  }

  const response = await fetch(url, {
    ...options,
    headers
  })

  if (!response.ok) {
    let errorData
    try {
      errorData = await response.json()
    } catch (e) {
      errorData = { message: `요청 실패 (${response.status} ${response.statusText})` }
    }
    
    // 에러 상세 정보 로깅
    console.error('API Error:', {
      status: response.status,
      statusText: response.statusText,
      errorData
    })
    
    // 유효성 검증 에러인 경우 상세 정보 표시
    if (errorData.data && typeof errorData.data === 'object') {
      const errorMessages = Object.values(errorData.data).join(', ')
      throw new Error(errorMessages || errorData.message || `요청 실패 (${response.status})`)
    }
    
    throw new Error(errorData.message || `요청 실패 (${response.status})`)
  }

  return response.json()
}

export const useCocktailStore = create(
  persist(
    (set, get) => ({
      customCocktails: [],
      loading: false,
      error: null,

      // 서버에서 칵테일 목록 가져오기
      fetchCocktails: async () => {
        set({ loading: true, error: null })
        try {
          const data = await apiRequest(`${API_BASE_URL}/cocktails`)
          if (data.success) {
            const cocktails = data.data.map(cocktail => ({
              id: cocktail.cocktailNo,
              name: cocktail.cocktailName,
              description: cocktail.description,
              ingredients: cocktail.ingredients || [],
              instructions: cocktail.instructions,
              image: cocktail.cocktailImagePath,
              userId: cocktail.memberNo,
              likeCount: cocktail.likeCount || 0,
              isLiked: cocktail.isLiked || false,
              createdAt: cocktail.createdAt ? new Date(cocktail.createdAt).getTime() : Date.now(),
              updatedAt: cocktail.updatedAt ? new Date(cocktail.updatedAt).getTime() : null
            }))
            set({ customCocktails: cocktails, loading: false })
            return cocktails
          }
        } catch (error) {
          console.error('칵테일 목록 조회 실패:', error)
          set({ error: error.message, loading: false })
          return []
        }
      },

      // 칵테일 생성
      addCocktail: async (cocktail, userId) => {
        try {
          // ingredients가 비어있으면 에러 발생 가능 - 최소 1개 필요
          if (!cocktail.ingredients || cocktail.ingredients.length === 0) {
            throw new Error('재료는 최소 1개 이상 필요합니다.')
          }

          const requestBody = {
            cocktailName: cocktail.name || '',
            description: cocktail.description || '',
            ingredients: cocktail.ingredients,
            instructions: cocktail.instructions || '',
            cocktailImagePath: cocktail.image || null
          }

          console.log('칵테일 생성 요청:', requestBody)
          console.log('요청 URL:', `${API_BASE_URL}/cocktails`)

          const data = await apiRequest(`${API_BASE_URL}/cocktails`, {
            method: 'POST',
            body: JSON.stringify(requestBody)
          })

          if (data.success) {
            const newCocktail = {
              id: data.data.cocktailNo,
              name: data.data.cocktailName,
              description: data.data.description,
              ingredients: data.data.ingredients || [],
              instructions: data.data.instructions,
              image: data.data.cocktailImagePath,
              userId: data.data.memberNo,
              likeCount: data.data.likeCount || 0,
              isLiked: data.data.isLiked || false,
              createdAt: data.data.createdAt ? new Date(data.data.createdAt).getTime() : Date.now(),
              updatedAt: data.data.updatedAt ? new Date(data.data.updatedAt).getTime() : null
            }

            set((state) => ({
              customCocktails: [...state.customCocktails, newCocktail]
            }))
            return newCocktail
          }
        } catch (error) {
          console.error('칵테일 생성 실패:', error)
          // 에러 메시지에 상세 정보 포함
          if (error.message) {
            alert(`칵테일 생성 실패: ${error.message}`)
          }
          throw error
        }
      },

      // 칵테일 수정
      updateCocktail: async (id, updatedCocktail) => {
        try {
          const requestBody = {
            cocktailName: updatedCocktail.name,
            description: updatedCocktail.description || '',
            ingredients: updatedCocktail.ingredients || [],
            instructions: updatedCocktail.instructions || '',
            cocktailImagePath: updatedCocktail.image || null
          }

          const data = await apiRequest(`${API_BASE_URL}/cocktails/${id}`, {
            method: 'PUT',
            body: JSON.stringify(requestBody)
          })

          if (data.success) {
            const updated = {
              id: data.data.cocktailNo,
              name: data.data.cocktailName,
              description: data.data.description,
              ingredients: data.data.ingredients || [],
              instructions: data.data.instructions,
              image: data.data.cocktailImagePath,
              userId: data.data.memberNo,
              likeCount: data.data.likeCount || 0,
              isLiked: data.data.isLiked || false,
              createdAt: data.data.createdAt ? new Date(data.data.createdAt).getTime() : Date.now(),
              updatedAt: data.data.updatedAt ? new Date(data.data.updatedAt).getTime() : Date.now()
            }

            set((state) => ({
              customCocktails: state.customCocktails.map(cocktail =>
                String(cocktail.id) === String(id) ? updated : cocktail
              )
            }))
            return updated
          }
        } catch (error) {
          console.error('칵테일 수정 실패:', error)
          throw error
        }
      },

      // 칵테일 삭제
      deleteCocktail: async (id) => {
        try {
          await apiRequest(`${API_BASE_URL}/cocktails/${id}`, {
            method: 'DELETE'
          })

          set((state) => ({
            customCocktails: state.customCocktails.filter(cocktail => String(cocktail.id) !== String(id))
          }))
        } catch (error) {
          console.error('칵테일 삭제 실패:', error)
          throw error
        }
      },

      // 현재 로그인한 유저의 칵테일만 가져오기
      getUserCocktails: (userId) => {
        return get().customCocktails.filter(cocktail => cocktail.userId === userId)
      },

      // 사용자별 좋아요 상태 확인
      isLikedByUser: (id, userId) => {
        if (!userId) return false
        const cocktail = get().customCocktails.find(c => String(c.id) === String(id))
        return cocktail?.isLiked || false
      },

      // 좋아요 토글
      toggleLike: async (id, userId) => {
        if (!userId) return

        try {
          const data = await apiRequest(`${API_BASE_URL}/cocktails/${id}/likes`, {
            method: 'POST'
          })

          if (data.success) {
            const likeResponse = data.data
            set((state) => ({
              customCocktails: state.customCocktails.map(cocktail =>
                String(cocktail.id) === String(id)
                  ? {
                      ...cocktail,
                      likeCount: likeResponse.likeCount || 0,
                      isLiked: likeResponse.isLiked || false
                    }
                  : cocktail
              )
            }))
            return likeResponse
          }
        } catch (error) {
          console.error('좋아요 토글 실패:', error)
          throw error
        }
      },

      // 좋아요 개수 조회
      getLikeCount: (id) => {
        const cocktail = get().customCocktails.find(c => String(c.id) === String(id))
        return cocktail?.likeCount || 0
      }
    }),
    {
      name: 'cocktail-lab-cocktails',
    }
  )
)
