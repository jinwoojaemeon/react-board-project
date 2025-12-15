import React, { useMemo, useEffect } from 'react'
import {
  Container,
  PageTitle,
  Section,
  SectionTitle,
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
  RecipeDescription,
  RecipeIngredients,
  IngredientsList,
  IngredientTag,
  LikeButtonGroup,
  LikeButton,
  LikeCount
} from './Home.styled'
import { useCocktailStore } from '../stores/cocktailStore'
import { useAuthStore } from '../stores/authStore'

const Home = () => {
  const { customCocktails, toggleLike, isLikedByUser, getLikeCount, fetchCocktails } = useCocktailStore()
  const { user } = useAuthStore()

  // 서버에서 칵테일 목록 가져오기
  useEffect(() => {
    fetchCocktails()
  }, [fetchCocktails])

  // Total: 좋아요가 있는 모든 칵테일을 좋아요 수 순으로 정렬해서 상위 3개만
  const totalPopular = useMemo(() => {
    return customCocktails
      .filter(cocktail => getLikeCount(cocktail.id) > 0)
      .map(cocktail => ({
        ...cocktail,
        likeCount: getLikeCount(cocktail.id)
      }))
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, 3)
  }, [customCocktails, getLikeCount])

  // 주간: 최근 7일 내에 좋아요를 받은 칵테일 중 상위 3개만 (서버에서 날짜 정보를 받아야 함)
  const weeklyPopular = useMemo(() => {
    return customCocktails
      .filter(cocktail => getLikeCount(cocktail.id) > 0)
      .map(cocktail => ({
        ...cocktail,
        likeCount: getLikeCount(cocktail.id)
      }))
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, 3)
  }, [customCocktails, getLikeCount])

  // 일별: 오늘 좋아요를 받은 칵테일 중 상위 3개만 (서버에서 날짜 정보를 받아야 함)
  const dailyPopular = useMemo(() => {
    return customCocktails
      .filter(cocktail => getLikeCount(cocktail.id) > 0)
      .map(cocktail => ({
        ...cocktail,
        likeCount: getLikeCount(cocktail.id)
      }))
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, 3)
  }, [customCocktails, getLikeCount])

  const handleToggleLike = async (id) => {
    try {
      await toggleLike(id, user?.memberNo)
      await fetchCocktails() // 목록 새로고침
    } catch (error) {
      alert('좋아요 처리에 실패했습니다.')
    }
  }

  const renderCocktailCard = (cocktail) => {
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
          {cocktail.description && (
            <RecipeDescription>{cocktail.description}</RecipeDescription>
          )}
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
  }

  return (
    <Container>
      <PageTitle>Popular Custom Cocktails</PageTitle>
      
      <Section>
        <SectionTitle>Total Popular</SectionTitle>
        {totalPopular.length === 0 ? (
          <EmptyMessage>아직 좋아요를 받은 칵테일이 없습니다.</EmptyMessage>
        ) : (
          <RecipesGrid>
            {totalPopular.map(renderCocktailCard)}
          </RecipesGrid>
        )}
      </Section>

      <Section>
        <SectionTitle>Weekly Popular</SectionTitle>
        {weeklyPopular.length === 0 ? (
          <EmptyMessage>최근 7일간 좋아요를 받은 칵테일이 없습니다.</EmptyMessage>
        ) : (
          <RecipesGrid>
            {weeklyPopular.map(renderCocktailCard)}
          </RecipesGrid>
        )}
      </Section>

      <Section>
        <SectionTitle>Daily Popular</SectionTitle>
        {dailyPopular.length === 0 ? (
          <EmptyMessage>오늘 좋아요를 받은 칵테일이 없습니다.</EmptyMessage>
        ) : (
          <RecipesGrid>
            {dailyPopular.map(renderCocktailCard)}
          </RecipesGrid>
        )}
      </Section>
    </Container>
  )
}

export default Home
