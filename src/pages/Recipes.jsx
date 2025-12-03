import React from 'react'
import {
  RecipesContainer,
  PageTitle,
  RecipesGrid,
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
  IngredientTag,
  EmptyState,
  EmptyStateText
} from './Recipes.styled'
import mojitoImage from '../resources/cocktailImages/Mojito.jpg'
import margaritaImage from '../resources/cocktailImages/Margarita.jpg'
import oldFashionedImage from '../resources/cocktailImages/oldpassioned.jpg'
import negroniImage from '../resources/cocktailImages/Negroni.jpg'
import martiniImage from '../resources/cocktailImages/matine.jpg'
import junebugImage from '../resources/cocktailImages/junebug.jpg'

const Recipes = () => {
  // 임시 데이터 - 나중에 API나 상태 관리로 교체 가능
  const recipes = [
    {
      id: 1,
      name: 'Mojito',
      image: mojitoImage,
      description: '상큼한 라임과 민트의 조화로 완성된 클래식한 칵테일',
      ingredients: ['화이트 럼', '라임', '민트', '설탕', '소다수', '콜린스 글래스']
    },
    {
      id: 2,
      name: 'Margarita',
      image: margaritaImage,
      description: '테킬라의 깊은 맛과 라임의 상큼함이 어우러진 멕시칸 칵테일',
      ingredients: ['테킬라', '트리플 섹', '라임', '소금', '마가리타 글래스']
    },
    {
      id: 3,
      name: 'Old Fashioned',
      image: oldFashionedImage,
      description: '위스키의 진한 풍미를 느낄 수 있는 클래식한 칵테일',
      ingredients: ['버번 위스키', '설탕', '앵거스투라 비터', '오렌지 피일', '록스 글래스']
    },
    {
      id: 4,
      name: 'Negroni',
      image: negroniImage,
      description: '진, 베르무트, 캄파리의 완벽한 밸런스',
      ingredients: ['진', '스위트 베르무트', '캄파리', '오렌지 피일', '록스 글래스']
    },
    {
      id: 5,
      name: 'Martini',
      image: martiniImage,
      description: '우아하고 세련된 클래식 칵테일의 대표작',
      ingredients: ['진', '드라이 베르무트', '올리브', '마티니 글래스']
    },
    {
      id: 6,
      name: 'Junebug',
      image: junebugImage,
      description: '상큼하고 시원한 여름 칵테일, 크랜베리의 달콤함이 특징입니다',
      ingredients: ['말리부', '크랜베리 주스', '파인애플 주스', '라임', '하이볼 글래스']
    }
  ]

  return (
    <RecipesContainer>
      <PageTitle>Cocktail Recipes</PageTitle>
      {recipes.length > 0 ? (
        <RecipesGrid>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id}>
              <RecipeImageContainer>
                {recipe.image ? (
                  <RecipeImage src={recipe.image} alt={recipe.name} />
                ) : (
                  <RecipeImagePlaceholder>🍹</RecipeImagePlaceholder>
                )}
              </RecipeImageContainer>
              <RecipeContent>
                <RecipeHeader>
                  <RecipeName>{recipe.name}</RecipeName>
                </RecipeHeader>
                <RecipeDescription>{recipe.description}</RecipeDescription>
                <RecipeIngredients>
                  <IngredientsList>
                    {recipe.ingredients.map((ingredient, index) => (
                      <IngredientTag key={index}>{ingredient}</IngredientTag>
                    ))}
                  </IngredientsList>
                </RecipeIngredients>
              </RecipeContent>
            </RecipeCard>
          ))}
        </RecipesGrid>
      ) : (
        <EmptyState>
          <EmptyStateText>등록된 레시피가 없습니다.</EmptyStateText>
        </EmptyState>
      )}
    </RecipesContainer>
  )
}

export default Recipes