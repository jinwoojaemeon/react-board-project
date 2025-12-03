import { useState, useEffect } from 'react'
import { useCocktailStore } from '../stores/cocktailStore'
import {
  ModalOverlay,
  ModalContent,
  ModalTitle,
  Form,
  Input,
  TextArea,
  Select,
  ButtonGroup,
  LoginButtonModal,
  CancelButton,
  IngredientSection,
  IngredientInputGroup,
  IngredientSelect,
  AmountInput,
  UnitSelect,
  AddIngredientButton,
  IngredientList,
  IngredientItem,
  IngredientInfo,
  RemoveIngredientButton,
  ImageUploadSection,
  ImageInput,
  ImageInputLabel,
  ImagePreview,
  PreviewImage,
  RemoveImageButton
} from './Layout.styled'
import { ShakerAnimationContainer, ShakerAnimationIcon } from './LabForm.styled'
import shakerIcon from '../resources/icons/shaker.png'

const LabForm = ({ isOpen, onClose }) => {
  const { addCocktail } = useCocktailStore()
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    glass: '',
    instructions: '',
    image: null
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [ingredients, setIngredients] = useState([])
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    amount: '',
    unit: 'oz'
  })

  const units = ['oz', 'ml', 'dash', 'drop', 'tsp', 'tbsp', '개', '조각', '직접 입력']
  const [isCustomUnit, setIsCustomUnit] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationStage, setAnimationStage] = useState('')
  const [pendingCocktail, setPendingCocktail] = useState(null)

  const commonIngredients = [
    '화이트 럼', '다크 럼', '진', '보드카', '위스키', '버번 위스키', '스카치 위스키',
    '테킬라', '브랜디', '코냑', '트리플 섹', '오렌지 리큐르', '블루 큐라소',
    '베르무트', '드라이 베르무트', '스위트 베르무트', '캄파리', '앵거스투라 비터',
    '라임 주스', '레몬 주스', '오렌지 주스', '크랜베리 주스', '파인애플 주스',
    '그레나딘 시럽', '심플 시럽', '설탕', '소다수', '토닉 워터', '진저 에일',
    '민트', '라임', '레몬', '오렌지', '올리브', '체리', '소금'
  ]

  const handleAddIngredient = () => {
    if (newIngredient.name.trim() && newIngredient.amount.trim() && newIngredient.unit.trim()) {
      setIngredients([...ingredients, {
        id: Date.now(),
        name: newIngredient.name.trim(),
        amount: newIngredient.amount.trim(),
        unit: newIngredient.unit.trim()
      }])
      setNewIngredient({ name: '', amount: '', unit: 'oz' })
      setIsCustomUnit(false)
    }
  }

  const handleRemoveIngredient = (id) => {
    setIngredients(ingredients.filter(ing => ing.id !== id))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name.trim() && ingredients.length > 0) {
      const ingredientsArray = ingredients.map(ing => 
        ing.amount ? `${ing.name} ${ing.amount}${ing.unit}` : ing.name
      )
      
      if (formData.glass.trim()) {
        ingredientsArray.push(formData.glass.trim())
      }

      const cocktailData = {
        name: formData.name.trim(),
        description: formData.description.trim() || '커스텀 칵테일',
        ingredients: ingredientsArray,
        instructions: formData.instructions.trim(),
        image: formData.image
      }

      // 애니메이션 시작
      setPendingCocktail(cocktailData)
      setIsAnimating(true)
      setAnimationStage('shake-first')
    }
  }

  useEffect(() => {
    if (!isAnimating) return

    // 1초간 흔들림
    if (animationStage === 'shake-first') {
      const timer = setTimeout(() => {
        setAnimationStage('flip')
      }, 1000)
      return () => clearTimeout(timer)
    }

    // 180도 뒤집기
    if (animationStage === 'flip') {
      const timer = setTimeout(() => {
        setAnimationStage('shake-second')
      }, 500)
      return () => clearTimeout(timer)
    }

    // 한번 더 흔들림
    if (animationStage === 'shake-second') {
      const timer = setTimeout(() => {
        // 애니메이션 완료 후 칵테일 추가
        if (pendingCocktail) {
          addCocktail(pendingCocktail)
        }
        
        // 폼 초기화
        setFormData({
          name: '',
          description: '',
          glass: '',
          instructions: '',
          image: null
        })
        setImagePreview(null)
        setIngredients([])
        setNewIngredient({ name: '', amount: '', unit: 'oz' })
        setIsCustomUnit(false)
        setPendingCocktail(null)
        setIsAnimating(false)
        setAnimationStage('')
        onClose()
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isAnimating, animationStage, pendingCocktail, addCocktail, onClose])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // 파일 크기 제한 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('이미지 크기는 5MB 이하여야 합니다.')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        setFormData({
          ...formData,
          image: base64String
        })
        setImagePreview(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      image: null
    })
    setImagePreview(null)
  }

  if (!isOpen) return null

  return (
    <>
      {isAnimating && (
        <ShakerAnimationContainer>
          <ShakerAnimationIcon 
            src={shakerIcon} 
            alt="쉐이커" 
            className={animationStage}
          />
        </ShakerAnimationContainer>
      )}
      <ModalOverlay onClick={isAnimating ? undefined : onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalTitle>칵테일 제작</ModalTitle>
          <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="칵테일 이름"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextArea
            name="description"
            placeholder="설명 (선택사항)"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
          <ImageUploadSection>
            <ImageInput
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview ? (
              <>
                <ImagePreview>
                  <PreviewImage src={imagePreview} alt="미리보기" />
                </ImagePreview>
                <RemoveImageButton type="button" onClick={handleRemoveImage}>
                  이미지 제거
                </RemoveImageButton>
              </>
            ) : (
              <ImageInputLabel htmlFor="image-upload">
                📷 이미지 추가 (선택사항)
              </ImageInputLabel>
            )}
          </ImageUploadSection>
          <IngredientSection>
            <IngredientSelect
              value={newIngredient.name}
              onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
            >
              <option value="">재료 선택</option>
              {commonIngredients.map(ing => (
                <option key={ing} value={ing}>{ing}</option>
              ))}
            </IngredientSelect>
            <IngredientInputGroup>
              <AmountInput
                type="number"
                step="0.25"
                min="0"
                placeholder="용량"
                value={newIngredient.amount}
                onChange={(e) => setNewIngredient({ ...newIngredient, amount: e.target.value })}
              />
              {isCustomUnit ? (
                <Input
                  type="text"
                  placeholder="단위 입력"
                  value={newIngredient.unit === '직접 입력' ? '' : newIngredient.unit}
                  onChange={(e) => setNewIngredient({ ...newIngredient, unit: e.target.value })}
                  style={{ width: '100px', flexShrink: 0 }}
                  autoFocus
                />
              ) : (
                <UnitSelect
                  value={newIngredient.unit}
                  onChange={(e) => {
                    if (e.target.value === '직접 입력') {
                      setIsCustomUnit(true)
                      setNewIngredient({ ...newIngredient, unit: '' })
                    } else {
                      setNewIngredient({ ...newIngredient, unit: e.target.value })
                    }
                  }}
                >
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </UnitSelect>
              )}
              <AddIngredientButton type="button" onClick={handleAddIngredient}>
                추가
              </AddIngredientButton>
            </IngredientInputGroup>
            {ingredients.length > 0 && (
              <IngredientList>
                {ingredients.map(ing => (
                  <IngredientItem key={ing.id}>
                    <IngredientInfo>
                      {ing.name} {ing.amount && `${ing.amount}${ing.unit}`}
                    </IngredientInfo>
                    <RemoveIngredientButton
                      type="button"
                      onClick={() => handleRemoveIngredient(ing.id)}
                    >
                      삭제
                    </RemoveIngredientButton>
                  </IngredientItem>
                ))}
              </IngredientList>
            )}
          </IngredientSection>
          <Select
            name="glass"
            value={formData.glass}
            onChange={handleChange}
          >
            <option value="">잔 종류 선택 (선택사항)</option>
            <option value="콜린스 글래스">콜린스 글래스</option>
            <option value="마가리타 글래스">마가리타 글래스</option>
            <option value="록스 글래스">록스 글래스</option>
            <option value="올드 패션드 글래스">올드 패션드 글래스</option>
            <option value="마티니 글래스">마티니 글래스</option>
            <option value="하이볼 글래스">하이볼 글래스</option>
            <option value="샷 글래스">샷 글래스</option>
            <option value="와인 글래스">와인 글래스</option>
            <option value="샴페인 글래스">샴페인 글래스</option>
          </Select>
          <TextArea
            name="instructions"
            placeholder="제조법 (선택사항, 예: 1. 쉐이커에 모든 재료를 넣고 얼음을 추가합니다. 2. 10초간 흔듭니다. 3. 글래스에 스트레이너를 사용해 따릅니다.)"
            value={formData.instructions}
            onChange={handleChange}
            rows="4"
          />
          <ButtonGroup>
            <LoginButtonModal type="submit" disabled={isAnimating}>
              {isAnimating ? '제작 중...' : '제작'}
            </LoginButtonModal>
            <CancelButton type="button" onClick={onClose} disabled={isAnimating}>
              취소
            </CancelButton>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
    </>
  )
}

export default LabForm

