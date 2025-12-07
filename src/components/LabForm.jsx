import { useState, useEffect, useRef } from 'react'
import { useCocktailStore } from '../stores/cocktailStore'
import { useAuthStore } from '../stores/authStore'
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
  RemoveIngredientButton,
  ImageUploadSection,
  ImageInput,
  ImageInputLabel,
  ImagePreview,
  PreviewImage,
  RemoveImageButton
} from './Layout.styled'
import { 
  ShakerAnimationContainer, 
  ShakerAnimationIcon,
  ModalFormSection,
  ShakerVisualizationContainer,
  ShakerSVGWrapper,
  ShakerSVG,
  ShakerBody,
  ShakerTop,
  ShakerInfo,
  ShakerInfoTitle,
  IngredientRatioList,
  IngredientRatioItem,
  ColorIndicator,
  RatioText,
  PercentageText
} from './LabForm.styled'
import shakerIcon from '../resources/icons/shaker.png'

const LabForm = ({ isOpen, onClose, editingCocktail = null }) => {
  const { addCocktail, updateCocktail } = useCocktailStore()
  const { user } = useAuthStore()
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
  const [newlyAddedIngredientId, setNewlyAddedIngredientId] = useState(null)
  const previousIngredientsRef = useRef([])

  // ingredients 문자열 배열을 파싱하여 객체 배열로 변환
  const parseIngredients = (ingredientsArray) => {
    if (!ingredientsArray || !Array.isArray(ingredientsArray)) return []
    
    const glassTypes = [
      '콜린스 글래스', '마가리타 글래스', '록스 글래스', '올드 패션드 글래스',
      '마티니 글래스', '하이볼 글래스', '샷 글래스', '와인 글래스', '샴페인 글래스'
    ]
    
    const parsed = []
    let glass = ''
    
    ingredientsArray.forEach((ing, index) => {
      // 잔 종류인지 확인
      const isGlass = glassTypes.some(glassType => ing.includes(glassType))
      
      if (isGlass) {
        glass = ing
        return
      }
      
      // 재료 파싱: "화이트 럼 2oz" 형식
      const match = ing.match(/^(.+?)\s+(\d+(?:\.\d+)?)(.+)$/)
      if (match) {
        const [, name, amount, unit] = match
        parsed.push({
          id: Date.now() + index,
          name: name.trim(),
          amount: amount.trim(),
          unit: unit.trim()
        })
      } else {
        // 양과 단위가 없는 경우 (예: "민트")
        parsed.push({
          id: Date.now() + index,
          name: ing.trim(),
          amount: '',
          unit: 'oz'
        })
      }
    })
    
    return { parsed, glass }
  }

  // editingCocktail이 변경될 때 폼 데이터 채우기
  useEffect(() => {
    if (editingCocktail && isOpen) {
      const { parsed, glass } = parseIngredients(editingCocktail.ingredients)
      
      setFormData({
        name: editingCocktail.name || '',
        description: editingCocktail.description || '',
        glass: glass || '',
        instructions: editingCocktail.instructions || '',
        image: editingCocktail.image || null
      })
      setImagePreview(editingCocktail.image || null)
      setIngredients(parsed)
    } else if (!editingCocktail && isOpen) {
      // 새로 생성하는 경우 폼 초기화
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
    }
  }, [editingCocktail, isOpen])

  const commonIngredients = [
    '화이트 럼', '다크 럼', '진', '보드카', '위스키', '버번 위스키', '스카치 위스키',
    '테킬라', '브랜디', '코냑', '트리플 섹', '오렌지 리큐르', '블루 큐라소',
    '베르무트', '드라이 베르무트', '스위트 베르무트', '캄파리', '앵거스투라 비터',
    '라임 주스', '레몬 주스', '오렌지 주스', '크랜베리 주스', '파인애플 주스',
    '그레나딘 시럽', '심플 시럽', '락스' ,'설탕', '소다수', '토닉 워터', '진저 에일',
    '민트', '라임', '레몬', '오렌지', '올리브', '체리', '소금' 
  ]

  // 재료별 색상 매핑 함수
  const getIngredientColor = (ingredientName) => {
    const name = ingredientName.toLowerCase()
    
    // 락스
    if (name.includes('락스')) return '#8a8a8a' 

    // 럼 계열
    if (name.includes('럼')) {
      if (name.includes('다크')) return '#8B4513' // 갈색
      return '#D4A574' // 황금색
    }
    
    // 진
    if (name.includes('진')) return '#F5F5DC' // 베이지/투명
    
    // 보드카
    if (name.includes('보드카')) return 'rgba(255, 255, 255, 0.3)' // 투명
    
    // 위스키 계열
    if (name.includes('위스키')) return '#D2691E' // 호박색
    
    // 테킬라
    if (name.includes('테킬라')) return '#FFD700' // 금색
    
    // 브랜디/코냑
    if (name.includes('브랜디') || name.includes('코냑')) return '#CD853F' // 페루색
    
    // 리큐르
    if (name.includes('리큐르')) {
      if (name.includes('오렌지')) return '#FFA500' // 주황색
      if (name.includes('블루')) return '#4169E1' // 파란색
      return '#FFD700' // 금색
    }
    
    // 베르무트
    if (name.includes('베르무트')) {
      if (name.includes('드라이')) return '#F5F5DC' // 베이지
      return '#8B0000' // 진한 빨강
    }
    
    // 캄파리
    if (name.includes('캄파리')) return '#DC143C' // 진한 빨강
    
    // 비터
    if (name.includes('비터')) return '#2F4F4F' // 다크 슬레이트 그레이
    
    // 주스류
    if (name.includes('주스')) {
      if (name.includes('라임')) return '#32CD32' // 라임 그린
      if (name.includes('레몬')) return '#FFD700' // 노란색
      if (name.includes('오렌지')) return '#FF8C00' // 다크 오렌지
      if (name.includes('크랜베리')) return '#DC143C' // 진한 빨강
      if (name.includes('파인애플')) return '#FFD700' // 노란색
      return '#FFA500' // 주황색
    }
    
    // 시럽
    if (name.includes('시럽')) {
      if (name.includes('그레나딘')) return '#FF1493' // 딥 핑크
      return '#FFFFFF' // 흰색 (심플 시럽)
    }
    
    // 설탕
    if (name.includes('설탕')) return '#FFFFFF' // 흰색
    
    // 탄산음료
    if (name.includes('소다수') || name.includes('토닉') || name.includes('진저')) {
      return 'rgba(255, 255, 255, 0.5)' // 투명한 흰색
    }
    
    // 과일/식물
    if (name.includes('민트')) return '#90EE90' // 연한 초록
    if (name.includes('라임')) return '#32CD32' // 라임 그린
    if (name.includes('레몬')) return '#FFD700' // 노란색
    if (name.includes('오렌지')) return '#FF8C00' // 다크 오렌지
    if (name.includes('체리')) return '#DC143C' // 진한 빨강
    if (name.includes('올리브')) return '#556B2F' // 올리브 그린
    
    // 소금
    if (name.includes('소금')) return '#FFFFFF' // 흰색
    
    // 기본값 (알 수 없는 재료)
    return '#D3D3D3' // 연한 회색
  }

  // 단위를 oz로 변환하는 함수
  const convertToOz = (amount, unit) => {
    const numAmount = parseFloat(amount) || 0
    
    switch (unit) {
      case 'oz':
        return numAmount
      case 'ml':
        return numAmount / 30 // 1oz = 30ml
      case 'dash':
        return numAmount * 0.02 // 대략 0.02oz
      case 'drop':
        return numAmount * 0.001 // 대략 0.001oz
      case 'tsp':
        return numAmount * 0.167 // 1tsp = 약 0.167oz
      case 'tbsp':
        return numAmount * 0.5 // 1tbsp = 약 0.5oz
      case '개':
      case '조각':
        return numAmount * 0.1 // 과일 등은 대략 0.1oz로 가정
      default:
        return numAmount // 직접 입력된 단위는 그대로 사용 (숫자로 변환 가능한 경우)
    }
  }

  // 재료 비율 계산
  const calculateIngredientRatios = () => {
    if (ingredients.length === 0) return []

    // 각 재료를 oz로 변환
    const ingredientsWithOz = ingredients.map(ing => ({
      ...ing,
      ozAmount: convertToOz(ing.amount, ing.unit)
    }))

    // 총량 계산
    const totalOz = ingredientsWithOz.reduce((sum, ing) => sum + ing.ozAmount, 0)
    
    if (totalOz === 0) return []

    // 비율 계산 및 색상 추가 (원본 재료 정보 유지)
    return ingredientsWithOz
      .map(ing => ({
        ...ing,
        percentage: (ing.ozAmount / totalOz) * 100,
        color: getIngredientColor(ing.name),
        originalAmount: ing.amount,
        originalUnit: ing.unit
      }))
      .sort((a, b) => b.percentage - a.percentage) // 비율이 큰 순서대로 정렬
  }

  const ingredientRatios = calculateIngredientRatios()

  const handleAddIngredient = () => {
    if (newIngredient.name.trim() && newIngredient.amount.trim() && newIngredient.unit.trim()) {
      const newId = Date.now()
      const newIngredientData = {
        id: newId,
        name: newIngredient.name.trim(),
        amount: newIngredient.amount.trim(),
        unit: newIngredient.unit.trim()
      }
      setIngredients([...ingredients, newIngredientData])
      setNewlyAddedIngredientId(newId)
      setNewIngredient({ name: '', amount: '', unit: 'oz' })
      setIsCustomUnit(false)
      
      // 이전 재료 목록 업데이트
      previousIngredientsRef.current = [...ingredients, newIngredientData]
      
      // 애니메이션 완료 후 상태 초기화
      setTimeout(() => {
        setNewlyAddedIngredientId(null)
      }, 600)
    }
  }
  
  // 재료가 제거될 때 이전 목록 업데이트
  useEffect(() => {
    previousIngredientsRef.current = ingredients
  }, [ingredients])

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

      // 수정 모드인 경우
      if (editingCocktail) {
        updateCocktail(editingCocktail.id, cocktailData)
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
        onClose()
        return
      }

      // 애니메이션 시작 (생성 모드)
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
        if (pendingCocktail && user) {
          addCocktail(pendingCocktail, user.id)
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

  // 로그인하지 않은 유저는 폼을 열 수 없음
  if (!user) {
    return null
  }

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
          <ModalFormSection>
            <ModalTitle>{editingCocktail ? '칵테일 수정' : '칵테일 제작'}</ModalTitle>
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
                {editingCocktail 
                  ? '수정' 
                  : isAnimating 
                    ? '제작 중...' 
                    : '제작'}
              </LoginButtonModal>
              <CancelButton type="button" onClick={onClose} disabled={isAnimating}>
                취소
              </CancelButton>
            </ButtonGroup>
          </Form>
          </ModalFormSection>
          <ShakerVisualizationContainer>
            <ShakerSVGWrapper>
              <ShakerSVG viewBox="0 0 200 300" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <clipPath id="shaker-clip">
                    <path d="M 50 60 Q 50 50 60 50 L 140 50 Q 150 50 150 60 L 150 240 Q 150 250 140 250 L 60 250 Q 50 250 50 240 Z" />
                  </clipPath>
                  {ingredientRatios.map((ing, index) => (
                    <linearGradient key={ing.id} id={`gradient-${ing.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor={ing.color} stopOpacity="0.9" />
                      <stop offset="100%" stopColor={ing.color} stopOpacity="0.7" />
                    </linearGradient>
                  ))}
                </defs>
                
                {/* 쉐이커 본체 */}
                <ShakerBody d="M 50 60 Q 50 50 60 50 L 140 50 Q 150 50 150 60 L 150 240 Q 150 250 140 250 L 60 250 Q 50 250 50 240 Z" />
                
                {/* 쉐이커 상단 (뚜껑) */}
                <ShakerTop d="M 60 50 L 140 50 L 135 30 L 65 30 Z" />
                
                {/* 액체 레이어들 */}
                {ingredientRatios.length > 0 && (
                  <g clipPath="url(#shaker-clip)">
                    {(() => {
                      let accumulatedHeight = 0;
                      const totalLiquidHeight = 180; // 60~240 사이의 높이
                      const startY = 240; // 바닥 Y 좌표
                      const leftX = 50;
                      const rightX = 150;
                      const radius = 5;
                      
                      return ingredientRatios.map((ing, index) => {
                        const height = (ing.percentage / 100) * totalLiquidHeight;
                        const bottomY = startY - accumulatedHeight;
                        const topY = bottomY - height;
                        accumulatedHeight += height;
                        
                        // 쉐이커 모양에 맞는 경로 생성
                        const isFirst = index === ingredientRatios.length - 1; // 가장 아래 레이어
                        const isLast = index === 0; // 가장 위 레이어
                        
                        let liquidPath = '';
                        
                        if (isFirst && bottomY >= 240 - radius) {
                          // 바닥 레이어 - 아래쪽 둥근 모서리
                          liquidPath = `
                            M ${leftX} ${bottomY}
                            Q ${leftX} ${bottomY + radius} ${leftX + radius} ${bottomY + radius}
                            L ${rightX - radius} ${bottomY + radius}
                            Q ${rightX} ${bottomY + radius} ${rightX} ${bottomY}
                            L ${rightX} ${topY + radius}
                            Q ${rightX} ${topY} ${rightX - radius} ${topY}
                            L ${leftX + radius} ${topY}
                            Q ${leftX} ${topY} ${leftX} ${topY + radius}
                            Z
                          `;
                        } else if (isLast && topY <= 60 + radius) {
                          // 상단 레이어 - 위쪽 둥근 모서리
                          liquidPath = `
                            M ${leftX} ${bottomY}
                            L ${leftX} ${topY + radius}
                            Q ${leftX} ${topY} ${leftX + radius} ${topY}
                            L ${rightX - radius} ${topY}
                            Q ${rightX} ${topY} ${rightX} ${topY + radius}
                            L ${rightX} ${bottomY}
                            Z
                          `;
                        } else {
                          // 중간 레이어 - 직사각형
                          liquidPath = `
                            M ${leftX} ${bottomY}
                            L ${rightX} ${bottomY}
                            L ${rightX} ${topY}
                            L ${leftX} ${topY}
                            Z
                          `;
                        }
                        
                        // 각 레이어를 감싸는 g 요소 (밑에서부터 차오르는 효과)
                        const isNewlyAdded = newlyAddedIngredientId === ing.id
                        const wasInPrevious = previousIngredientsRef.current.some(prev => prev.id === ing.id)
                        const shouldAnimate = isNewlyAdded || (!wasInPrevious && previousIngredientsRef.current.length > 0)
                        
                        return (
                          <g 
                            key={ing.id}
                            className="liquid-layer-container"
                            style={{
                              transformOrigin: `${(leftX + rightX) / 2}px ${bottomY}px`,
                              transform: shouldAnimate ? 'scaleY(0)' : 'scaleY(1)',
                              animation: shouldAnimate ? 'fillUp 0.6s ease-out forwards' : 'none',
                              animationDelay: isNewlyAdded ? '0s' : `${index * 0.05}s`
                            }}
                          >
                            <path
                              d={liquidPath.trim()}
                              fill={`url(#gradient-${ing.id})`}
                              opacity="0.85"
                            />
                          </g>
                        );
                      });
                    })()}
                  </g>
                )}
                
                {/* 쉐이커 외곽선 강조 */}
                <path
                  d="M 50 60 Q 50 50 60 50 L 140 50 Q 150 50 150 60 L 150 240 Q 150 250 140 250 L 60 250 Q 50 250 50 240 Z"
                  fill="none"
                  stroke="#A0A0A0"
                  strokeWidth="2"
                />
                <path
                  d="M 60 50 L 140 50 L 135 30 L 65 30 Z"
                  fill="none"
                  stroke="#A0A0A0"
                  strokeWidth="2"
                />
              </ShakerSVG>
            </ShakerSVGWrapper>
            <ShakerInfo>
              <ShakerInfoTitle>재료 비율</ShakerInfoTitle>
              {ingredientRatios.length > 0 ? (
                <IngredientRatioList>
                  {ingredientRatios.map((ing) => (
                    <IngredientRatioItem key={ing.id}>
                      <ColorIndicator color={ing.color} />
                      <RatioText>
                        <span style={{ fontWeight: 600 }}>{ing.name}</span>
                        {ing.originalAmount && (
                          <span style={{ 
                            fontSize: '12px', 
                            opacity: 0.7, 
                            marginLeft: '8px',
                            fontWeight: 'normal'
                          }}>
                            {ing.originalAmount}{ing.originalUnit}
                          </span>
                        )}
                      </RatioText>
                      <PercentageText>{ing.percentage.toFixed(1)}%</PercentageText>
                      <RemoveIngredientButton
                        type="button"
                        onClick={() => handleRemoveIngredient(ing.id)}
                      >
                        삭제
                      </RemoveIngredientButton>
                    </IngredientRatioItem>
                  ))}
                </IngredientRatioList>
              ) : (
                <IngredientRatioList>
                  <div style={{ 
                    textAlign: 'center', 
                    color: 'rgba(221, 230, 237, 0.7)', 
                    padding: '20px',
                    fontSize: '14px'
                  }}>
                    재료를 추가하면<br />비율이 표시됩니다
                  </div>
                </IngredientRatioList>
              )}
            </ShakerInfo>
          </ShakerVisualizationContainer>
        </ModalContent>
      </ModalOverlay>
    </>
  )
}

export default LabForm

