import React, { useState } from 'react'
import {
  Container,
  Title,
  CreateButton,
  ShakerIcon,
  CocktailListContainer,
  EmptyMessage,
  RecipeCard,
  RecipeImageContainer,
  RecipeImagePlaceholder,
  RecipeContent,
  RecipeHeader,
  RecipeName,
  DeleteButton,
  RecipeDescription,
  RecipeIngredients,
  IngredientsList,
  IngredientTag
} from './Lab.styled'
import { RecipeImage } from '../components/RecipeCard.styled'
import { useCocktailStore } from '../stores/cocktailStore'
import LabForm from '../components/LabForm'
import shakerIcon from '../resources/icons/shaker.png'

const Lab = () => {
  const { customCocktails, deleteCocktail } = useCocktailStore()
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <Container>
      <Title>My Cocktail Lab</Title>
      <CreateButton onClick={() => setIsFormOpen(true)}>
        <ShakerIcon src={shakerIcon} alt="제작" />
      </CreateButton>
      {customCocktails.length === 0 ? (
        <EmptyMessage>커스텀 칵테일이 없습니다. 제작 버튼을 눌러 새로운 칵테일을 만들어보세요!</EmptyMessage>
      ) : (
        <CocktailListContainer>
          {customCocktails.map((cocktail) => (
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
                  <DeleteButton onClick={() => deleteCocktail(cocktail.id)}>
                    삭제
                  </DeleteButton>
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
      <LabForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </Container>
  )
}

export default Lab