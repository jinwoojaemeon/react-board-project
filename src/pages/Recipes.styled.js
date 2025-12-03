import styled from 'styled-components'
import {
  RecipeCard,
  RecipeImageContainer,
  RecipeImage,
  RecipeImagePlaceholder,
  RecipeContent,
  RecipeHeader,
  RecipeName,
  RecipeDescription,
  RecipeIngredients,
  IngredientsList,
  IngredientTag
} from '../components/RecipeCard.styled'

export const RecipesContainer = styled.div`
    width: 100%;
`

export const PageTitle = styled.h1`
    color: #6F4E37;
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 32px 0;
    text-align: center;
    text-shadow: 0 2px 4px rgba(111, 78, 55, 0.2);
`

export const RecipesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 24px;
    padding: 0;
`

// 공통 스타일 재export
export {
  RecipeCard,
  RecipeImageContainer,
  RecipeImage,
  RecipeImagePlaceholder,
  RecipeContent,
  RecipeHeader,
  RecipeName,
  RecipeDescription,
  RecipeIngredients,
  IngredientsList,
  IngredientTag
}

export const EmptyState = styled.div`
    text-align: center;
    padding: 60px 20px;
    color: #6F4E37;
`

export const EmptyStateText = styled.p`
    font-size: 18px;
    margin: 0;
    opacity: 0.7;
`

