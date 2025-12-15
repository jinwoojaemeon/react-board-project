import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { ROUTES } from '../routes/routes'
import {
  Container,
  Form,
  FormContent,
  FormTitle,
  Input,
  ButtonGroup,
  SubmitButton,
  CancelButton,
  ErrorMessage
} from './Signup.styled'

const Signup = () => {
  const navigate = useNavigate()
  const { signup, checkUsernameExists } = useAuthStore()
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    nickname: '',
    email: ''
  })
  const [errors, setErrors] = useState({})
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // 에러 메시지 초기화
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  // 아이디 중복 체크 (실시간)
  const handleUsernameBlur = async () => {
    if (!formData.username.trim() || formData.username.length < 3) {
      return
    }

    setIsCheckingUsername(true)
    const exists = await checkUsernameExists(formData.username)
    
    if (exists) {
      setErrors(prev => ({
        ...prev,
        username: '이미 사용 중인 아이디입니다.'
      }))
    } else {
      setErrors(prev => {
        const newErrors = { ...prev }
        if (newErrors.username === '이미 사용 중인 아이디입니다.') {
          delete newErrors.username
        }
        return newErrors
      })
    }
    setIsCheckingUsername(false)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.username.trim()) {
      newErrors.username = '아이디를 입력해주세요.'
    } else if (formData.username.length < 3) {
      newErrors.username = '아이디는 3자 이상이어야 합니다.'
    }

    if (!formData.password.trim()) {
      newErrors.password = '비밀번호를 입력해주세요.'
    } else if (formData.password.length < 4) {
      newErrors.password = '비밀번호는 4자 이상이어야 합니다.'
    }

    if (!formData.nickname.trim()) {
      newErrors.nickname = '닉네임을 입력해주세요.'
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      const result = await signup(formData)
      
      if (result.success) {
        alert('회원가입이 완료되었습니다!')
        navigate(ROUTES.HOME)
      } else {
        setErrors(prev => ({
          ...prev,
          username: result.error || '회원가입에 실패했습니다.'
        }))
      }
    }
  }

  const handleCancel = () => {
    navigate(ROUTES.HOME)
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormContent>
          <FormTitle>회원가입</FormTitle>
          
          <div>
            <Input
              type="text"
              name="username"
              placeholder="아이디"
              value={formData.username}
              onChange={handleChange}
              onBlur={handleUsernameBlur}
              required
            />
            {isCheckingUsername && <div style={{ fontSize: '12px', color: '#6F4E37', marginTop: '4px' }}>확인 중...</div>}
            {errors.username && <ErrorMessage>{errors.username}</ErrorMessage>}
          </div>

          <div>
            <Input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
          </div>

          <div>
            <Input
              type="text"
              name="nickname"
              placeholder="닉네임"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
            {errors.nickname && <ErrorMessage>{errors.nickname}</ErrorMessage>}
          </div>

          <div>
            <Input
              type="email"
              name="email"
              placeholder="이메일"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </div>

          <ButtonGroup>
            <SubmitButton type="submit">회원가입</SubmitButton>
            <CancelButton type="button" onClick={handleCancel}>취소</CancelButton>
          </ButtonGroup>
        </FormContent>
      </Form>
    </Container>
  )
}

export default Signup

