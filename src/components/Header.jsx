import React from 'react'
import { HeaderContainer, Nav, Logo, NavLinks, NavLink, UserSection, LoginButton, SignupButton, UserInfo, LogoutButton } from './Layout.styled'
import { useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '../routes/routes'
import { useAuthStore } from '../stores/authStore'

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuthStore()

    const isActive = (path) => {
      return location.pathname === path ? 'active' : '';
    }
    return (
      <HeaderContainer>
        <Nav>
          <Logo to={ROUTES.HOME}>Cocktail Lab</Logo>
          <NavLinks>
            <NavLink to={ROUTES.HOME} className={isActive(ROUTES.HOME)}>Home</NavLink>
            <NavLink to={ROUTES.RECIPE} className={isActive(ROUTES.RECIPE)}>Recipe</NavLink>
            <NavLink to={ROUTES.LAB} className={isActive(ROUTES.LAB)}>Lab</NavLink>
            <NavLink to={ROUTES.LABBOARD} className={isActive(ROUTES.LABBOARD)}>LabBoard</NavLink>
            <UserSection>
              {user ? (
                <UserInfo>
                  <span>안녕하세요, {user.memberId || user.nickname}님</span>
                  <LogoutButton onClick={logout}>로그아웃</LogoutButton>
                </UserInfo>
              ) : (
                <>
                  <LoginButton onClick={() => navigate(ROUTES.LOGIN)}>로그인</LoginButton>
                  <SignupButton onClick={() => navigate(ROUTES.SIGNUP)}>회원가입</SignupButton>
                </>
              )}
            </UserSection>
          </NavLinks>
        </Nav>
      </HeaderContainer>
    )
}

export default Header