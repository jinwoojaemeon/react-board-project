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

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
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

export const EmptyMessage = styled.div`
    text-align: center;
    padding: 60px 20px;
    color: #6F4E37;
    font-size: 18px;
    opacity: 0.8;
    background: transparent;
`

export const LikeButton = styled.button`
    background: transparent;
    border: none;
    padding: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    border-radius: 50%;
    outline: none !important;
    flex-shrink: 0;

    &:hover {
        background: rgba(111, 78, 55, 0.1);
        transform: scale(1.1);
    }

    &:active {
        transform: scale(0.95);
    }

    svg {
        width: 24px;
        height: 24px;
        transition: all 0.3s ease;
    }

    &.liked {
        svg {
            fill: #e74c3c;
            stroke: #e74c3c;
        }
    }

    &:not(.liked) {
        svg {
            fill: none;
            stroke: #6F4E37;
        }
    }
`

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 2px solid rgba(111, 78, 55, 0.2);
`

export const LikeButtonGroup = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
    min-width: 80px;
    justify-content: flex-end;
`

export const CardTitleSection = styled.div`
    flex: 1;
`

export const LikeCount = styled.span`
    font-size: 14px;
    color: #6F4E37;
    opacity: 0.8;
    font-weight: 600;
    white-space: nowrap;
    line-height: 1;
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

