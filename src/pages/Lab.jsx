import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../routes/routes'
import {
  Container,
  Title,
  CreateButton,
  ShakerIcon,
  CocktailListContainer,
  EmptyMessage,
  LoginPrompt,
  RecipeCard,
  RecipeImageContainer,
  RecipeImagePlaceholder,
  RecipeContent,
  RecipeHeader,
  RecipeName,
  DeleteButton,
  EditButton,
  RecipeDescription,
  RecipeIngredients,
  IngredientsList,
  IngredientTag
} from './Lab.styled'
import { RecipeImage } from '../components/RecipeCard.styled'
import { useCocktailStore } from '../stores/cocktailStore'
import { useAuthStore } from '../stores/authStore'
import LabForm from '../components/LabForm'
import shakerIcon from '../resources/icons/shaker.png'

const Lab = () => {
  const navigate = useNavigate()
  const { customCocktails, deleteCocktail, fetchCocktails } = useCocktailStore()
  const { user } = useAuthStore()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingCocktail, setEditingCocktail] = useState(null)

  // 서버에서 칵테일 목록 가져오기
  useEffect(() => {
    fetchCocktails()
  }, [fetchCocktails])

  // 현재 로그인한 유저의 칵테일만 필터링
  const userCocktails = useMemo(() => {
    if (!user) return []
    return customCocktails.filter(cocktail => cocktail.userId === user.memberNo)
  }, [user, customCocktails])

  const handleDelete = async (id) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteCocktail(id)
        await fetchCocktails() // 목록 새로고침
      } catch (error) {
        alert('삭제에 실패했습니다.')
      }
    }
  }

  const handleCreateClick = () => {
    if (!user) {
      return // 로그인 안내 메시지가 표시됨
    }
    setEditingCocktail(null)
    setIsFormOpen(true)
  }

  const handleEditClick = (cocktail) => {
    setEditingCocktail(cocktail)
    setIsFormOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditingCocktail(null)
  }

  return (
    <Container>
      <Title>My Cocktail Lab</Title>
      <CreateButton 
        onClick={handleCreateClick}
        disabled={!user}
        style={{ opacity: user ? 1 : 0.5, cursor: user ? 'pointer' : 'not-allowed' }}
      >
        <ShakerIcon src={shakerIcon} alt="제작" />
      </CreateButton>
      
      {!user ? (
        <LoginPrompt>
          <p>커스텀 칵테일을 제작하기 위해 로그인해주세요.</p>
          <button onClick={() => navigate(ROUTES.LOGIN)}>로그인하기</button>
        </LoginPrompt>
      ) : userCocktails.length === 0 ? (
        <EmptyMessage>커스텀 칵테일이 없습니다. 제작 버튼을 눌러 새로운 칵테일을 만들어보세요!</EmptyMessage>
      ) : (
        <CocktailListContainer>
          {userCocktails.map((cocktail) => (
            <RecipeCard key={cocktail.id}>
              <RecipeImageContainer>
                {cocktail.image ? (
                  <RecipeImage src={cocktail.image} alt={cocktail.name} />
                ) : (
                  <RecipeImagePlaceholder>🍹</RecipeImagePlaceholder>
                )}
              </RecipeImageContainer>
              <RecipeContent>
                <RecipeHeader>
                  <RecipeName>{cocktail.name}</RecipeName>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <EditButton onClick={() => handleEditClick(cocktail)}>
                      수정
                    </EditButton>
                    <DeleteButton onClick={() => handleDelete(cocktail.id)}>
                      삭제
                    </DeleteButton>
                  </div>
                </RecipeHeader>
                <RecipeDescription>{cocktail.description}</RecipeDescription>
                <RecipeIngredients>
                  <IngredientsList>
                    {cocktail.ingredients.map((ingredient, index) => (
                      <IngredientTag key={index}>{ingredient}</IngredientTag>
                    ))}
                  </IngredientsList>
                </RecipeIngredients>
              </RecipeContent>
            </RecipeCard>
          ))}
        </CocktailListContainer>
      )}
      <LabForm 
        isOpen={isFormOpen} 
        onClose={handleFormClose}
        editingCocktail={editingCocktail}
      />
    </Container>
  )
}

export default Lab