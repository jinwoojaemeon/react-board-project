import React, { useMemo } from 'react'
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
  const { customCocktails, likeHistory, toggleLike, isLikedByUser } = useCocktailStore()
  const { user } = useAuthStore()

  // 좋아요 수 계산
  const getLikeCount = (id) => {
    return likeHistory[id] ? likeHistory[id].length : 0
  }

  // 날짜 필터링 함수들
  const isWithinWeek = (timestamp) => {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    return timestamp >= weekAgo
  }

  const isToday = (timestamp) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const timestampDate = new Date(timestamp)
    timestampDate.setHours(0, 0, 0, 0)
    return timestampDate.getTime() === today.getTime()
  }

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
  }, [customCocktails, likeHistory])

  // 주간: 최근 7일 내에 좋아요를 받은 칵테일 중 상위 3개만
  const weeklyPopular = useMemo(() => {
    return customCocktails
      .filter(cocktail => {
        if (!likeHistory[cocktail.id]) return false
        return likeHistory[cocktail.id].some(timestamp => isWithinWeek(timestamp))
      })
      .map(cocktail => ({
        ...cocktail,
        likeCount: likeHistory[cocktail.id].filter(timestamp => isWithinWeek(timestamp)).length
      }))
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, 3)
  }, [customCocktails, likeHistory])

  // 일별: 오늘 좋아요를 받은 칵테일 중 상위 3개만
  const dailyPopular = useMemo(() => {
    return customCocktails
      .filter(cocktail => {
        if (!likeHistory[cocktail.id]) return false
        return likeHistory[cocktail.id].some(timestamp => isToday(timestamp))
      })
      .map(cocktail => ({
        ...cocktail,
        likeCount: likeHistory[cocktail.id].filter(timestamp => isToday(timestamp)).length
      }))
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, 3)
  }, [customCocktails, likeHistory])

  const renderCocktailCard = (cocktail) => {
    const isLiked = isLikedByUser(cocktail.id, user && user.id)
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
                onClick={() => toggleLike(cocktail.id, user && user.id)}
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
