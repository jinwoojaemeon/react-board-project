import React, { useEffect } from 'react'
import {
  Container,
  PageTitle,
  RecipesGrid,
  EmptyMessage,
  RecipeCard,
  RecipeImageContainer,
  RecipeImage,
  RecipeImagePlaceholder,
  RecipeContent,
  CardHeader,
  CardTitleSection,
  RecipeName,
  LikeButtonGroup,
  LikeButton,
  LikeCount,
  RecipeDescription,
  RecipeIngredients,
  IngredientsList,
  IngredientTag
} from './LabBoard.styled'
import { useCocktailStore } from '../stores/cocktailStore'
import { useAuthStore } from '../stores/authStore'

const LabBoard = () => {
  const { customCocktails, toggleLike, isLikedByUser, getLikeCount, fetchCocktails } = useCocktailStore()
  const { user } = useAuthStore()

  // 서버에서 칵테일 목록 가져오기
  useEffect(() => {
    fetchCocktails()
  }, [fetchCocktails])

  const handleToggleLike = async (id) => {
    try {
      await toggleLike(id, user?.memberNo)
      await fetchCocktails() // 목록 새로고침
    } catch (error) {
      alert('좋아요 처리에 실패했습니다.')
    }
  }

  return (
    <Container>
      <PageTitle>Cocktail Lab Board</PageTitle>
      {customCocktails.length === 0 ? (
        <EmptyMessage>아직 등록된 칵테일이 없습니다.</EmptyMessage>
      ) : (
        <RecipesGrid>
          {customCocktails.map((cocktail) => {
            const isLiked = isLikedByUser(cocktail.id, user?.memberNo)
            const likeCount = getLikeCount(cocktail.id)
            
            return (
              <RecipeCard key={cocktail.id}>
                <RecipeImageContainer>
                  {cocktail.image ? (
                    <RecipeImage src={cocktail.image} alt={cocktail.name} />
                  ) : (
                    <RecipeImagePlaceholder>🍹</RecipeImagePlaceholder>
                  )}
                </RecipeImageContainer>
                <RecipeContent>
                  <CardHeader>
                    <CardTitleSection>
                      <RecipeName>{cocktail.name}</RecipeName>
                    </CardTitleSection>
                    <LikeButtonGroup>
                      {likeCount > 0 && <LikeCount>{likeCount}</LikeCount>}
                      <LikeButton
                        className={isLiked ? 'liked' : ''}
                        onClick={() => handleToggleLike(cocktail.id)}
                        aria-label={isLiked ? '좋아요 취소' : '좋아요'}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </LikeButton>
                    </LikeButtonGroup>
                  </CardHeader>
                  <RecipeDescription>{cocktail.description}</RecipeDescription>
                  {cocktail.instructions && (
                    <RecipeDescription style={{ marginTop: '12px', fontSize: '13px', fontStyle: 'italic' }}>
                      제조법: {cocktail.instructions}
                    </RecipeDescription>
                  )}
                  <RecipeIngredients>
                    <IngredientsList>
                      {cocktail.ingredients.map((ingredient, index) => (
                        <IngredientTag key={index}>{ingredient}</IngredientTag>
                      ))}
                    </IngredientsList>
                  </RecipeIngredients>
                </RecipeContent>
              </RecipeCard>
            )
          })}
        </RecipesGrid>
      )}
    </Container>
  )
}

export default LabBoard