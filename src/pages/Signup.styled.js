import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: 40px 20px;
`

export const Form = styled.form`
  background: linear-gradient(135deg, #FAF7F2 0%, #F8F4EF 50%, #F5F1EA 100%);
  padding: 0;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(111, 78, 55, 0.3);
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  border: 2px solid rgba(111, 78, 55, 0.2);
  overflow: hidden;
  position: relative;
  z-index: 1;
`

export const FormContent = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const FormTitle = styled.h2`
  color: #6F4E37;
  margin: 0 0 24px 0;
  font-size: 28px;
  font-weight: 700;
  text-align: center;
`

export const Input = styled.input`
  padding: 14px 18px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  background: rgba(255, 255, 255, 0.8);
  color: #6F4E37;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    outline: none;
    background: #ffffff;
    box-shadow: 0 2px 8px rgba(111, 78, 55, 0.2);
  }

  &::placeholder {
    color: rgba(111, 78, 55, 0.5);
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`

export const SubmitButton = styled.button`
  flex: 1;
  padding: 14px 24px;
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
`

export const CancelButton = styled.button`
  flex: 1;
  padding: 14px 24px;
  background: rgba(255, 255, 255, 0.6);
  color: #6F4E37;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 8px rgba(111, 78, 55, 0.2);
  }
`

export const ErrorMessage = styled.div`
  color: #8B4513;
  font-size: 13px;
  margin-top: 6px;
  padding-left: 4px;
`

