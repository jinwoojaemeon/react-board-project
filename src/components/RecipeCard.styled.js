import styled from 'styled-components'

export const RecipeCard = styled.div`
    background: linear-gradient(135deg, #FAF7F2 0%, #F8F4EF 50%, #F5F1EA 100%);
    border-radius: 12px;
    padding: 0;
    box-shadow: 0 4px 16px rgba(111, 78, 55, 0.3),
                inset 0 1px 2px rgba(255, 255, 255, 0.7);
    border: 2px solid rgba(111, 78, 55, 0.2);
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(111, 78, 55, 0.4),
                    inset 0 1px 2px rgba(255, 255, 255, 0.8);
        border-color: rgba(111, 78, 55, 0.4);
    }
`

export const RecipeImageContainer = styled.div`
    width: 100%;
    height: 200px;
    background: linear-gradient(135deg, rgba(254, 216, 177, 0.3) 0%, rgba(236, 177, 118, 0.3) 100%);
    border-radius: 12px 12px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
`

export const RecipeImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;

    ${RecipeCard}:hover & {
        transform: scale(1.05);
    }
`

export const RecipeImagePlaceholder = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(254, 216, 177, 0.4) 0%, rgba(236, 177, 118, 0.4) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6F4E37;
    font-size: 48px;
    opacity: 0.5;
`

export const RecipeContent = styled.div`
    padding: 20px;
`

export const RecipeHeader = styled.div`
    margin-bottom: 12px;
    padding-bottom: 12px;
    border-bottom: 2px solid rgba(111, 78, 55, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`

export const RecipeName = styled.h2`
    color: #6F4E37;
    font-size: 22px;
    font-weight: 700;
    margin: 0;
    flex: 1;
`

export const RecipeDescription = styled.p`
    color: #6F4E37;
    font-size: 14px;
    line-height: 1.6;
    margin: 0 0 16px 0;
    opacity: 0.9;
`

export const RecipeIngredients = styled.div`
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid rgba(111, 78, 55, 0.15);
`

export const IngredientsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`

export const IngredientTag = styled.li`
    background: rgba(111, 78, 55, 0.15);
    color: #6F4E37;
    font-size: 12px;
    padding: 4px 10px;
    border-radius: 12px;
    font-weight: 500;
`

