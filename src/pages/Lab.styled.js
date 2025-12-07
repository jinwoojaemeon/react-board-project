import styled from 'styled-components'
import {
  RecipeCard,
  RecipeImageContainer,
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

export const Title = styled.h1`
    color: #6F4E37;
    font-size: 32px;
    font-weight: 700;
    margin: 0;
    text-align: center;
    text-shadow: 0 2px 4px rgba(111, 78, 55, 0.2);
`

export const CreateButton = styled.button`
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    outline: none !important;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;

    &:focus,
    &:focus-visible,
    &:focus-within {
        outline: none !important;
    }

    &:active {
        transform: scale(0.95);
    }
`

export const ShakerIcon = styled.img`
    width: 60px;
    height: 60px;
    object-fit: contain;
    filter: brightness(0) saturate(100%) invert(27%) sepia(15%) saturate(1000%) hue-rotate(10deg) brightness(0.9);
    opacity: 0.9;
    transition: all 0.3s ease;

    @keyframes shake {
        0%, 100% {
            transform: translateY(0);
        }
        25% {
            transform: translateY(-8px);
        }
        75% {
            transform: translateY(8px);
        }
    }

    ${CreateButton}:hover & {
        opacity: 1;
        animation: shake 0.5s ease-in-out infinite;
        filter: brightness(0) saturate(100%) invert(27%) sepia(15%) saturate(1000%) hue-rotate(10deg) brightness(0.7);
    }
`

export const CocktailListContainer = styled.div`
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

export const LoginPrompt = styled.div`
    text-align: center;
    padding: 60px 20px;
    color: #6F4E37;
    background: linear-gradient(135deg, #FAF7F2 0%, #F8F4EF 50%, #F5F1EA 100%);
    border-radius: 12px;
    border: 2px solid rgba(111, 78, 55, 0.2);
    box-shadow: 0 4px 16px rgba(111, 78, 55, 0.3);
    
    p {
        font-size: 18px;
        margin: 0 0 24px 0;
        font-weight: 600;
    }
    
    button {
        padding: 12px 24px;
        background: rgba(111, 78, 55, 0.8);
        color: #FAF7F2;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
            background: rgba(111, 78, 55, 0.9);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(111, 78, 55, 0.3);
        }
        
        &:active {
            transform: translateY(0);
        }
    }
`

export const EditButton = styled.button`
    background: rgba(59, 130, 246, 0.1);
    color: #3B82F6;
    border: 1px solid rgba(59, 130, 246, 0.3);
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(59, 130, 246, 0.2);
        border-color: rgba(59, 130, 246, 0.5);
    }
`

export const DeleteButton = styled.button`
    background: rgba(111, 78, 55, 0.1);
    color: #6F4E37;
    border: 1px solid rgba(111, 78, 55, 0.3);
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(111, 78, 55, 0.2);
        border-color: rgba(111, 78, 55, 0.5);
    }
`

// 공통 스타일 재export
export {
  RecipeCard,
  RecipeImageContainer,
  RecipeImagePlaceholder,
  RecipeContent,
  RecipeHeader,
  RecipeName,
  RecipeDescription,
  RecipeIngredients,
  IngredientsList,
  IngredientTag
}

