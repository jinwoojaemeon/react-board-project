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
} from './Login.styled'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // 에러 메시지 초기화
    if (error) {
      setError('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.username.trim()) {
      setError('사용자명을 입력해주세요.')
      return
    }

    if (!formData.password.trim()) {
      setError('비밀번호를 입력해주세요.')
      return
    }

    // 로그인 처리
    const result = login(formData.username, formData.password)
    
    if (result.success) {
      navigate(ROUTES.HOME)
    } else {
      setError(result.error || '로그인에 실패했습니다.')
    }
  }

  const handleCancel = () => {
    navigate(ROUTES.HOME)
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <FormContent>
          <FormTitle>로그인</FormTitle>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}

          <div>
            <Input
              type="text"
              name="username"
              placeholder="사용자명"
              value={formData.username}
              onChange={handleChange}
              required
            />
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
          </div>

          <ButtonGroup>
            <SubmitButton type="submit">로그인</SubmitButton>
            <CancelButton type="button" onClick={handleCancel}>취소</CancelButton>
          </ButtonGroup>
        </FormContent>
      </Form>
    </Container>
  )
}

export default Login

