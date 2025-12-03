import { useState } from 'react'
import { useAuthStore } from '../stores/authStore'
import { ModalOverlay, ModalContent, ModalTitle, Form, Input, ButtonGroup, LoginButtonModal, CancelButton } from './Layout.styled'

const LoginModal = ({ isOpen, onClose }) => {
  const { login } = useAuthStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username.trim() && password.trim()) {
      login(username)
      setUsername('')
      setPassword('')
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>로그인</ModalTitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="사용자명"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <ButtonGroup>
            <LoginButtonModal type="submit">로그인</LoginButtonModal>
            <CancelButton type="button" onClick={onClose}>취소</CancelButton>
          </ButtonGroup>
        </Form>
      </ModalContent>
    </ModalOverlay>
  )
}

export default LoginModal

