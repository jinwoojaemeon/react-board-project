import React, { useState } from 'react'
import { HeaderContainer, Nav, Logo, NavLinks, NavLink, UserSection, LoginButton, UserInfo, LogoutButton } from './Layout.styled'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ROUTES } from '../routes/routes'
import { useAuthStore } from '../stores/authStore'
import LoginModal from './LoginModal'

const Header = () => {
    const location = useLocation();
    const { user, logout } = useAuthStore()
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

    useEffect(() => {
      console.log(location.pathname);
    })
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
                  <span>안녕하세요, {user.username}님</span>
                  <LogoutButton onClick={logout}>로그아웃</LogoutButton>
                </UserInfo>
              ) : (
                <LoginButton onClick={() => setIsLoginModalOpen(true)}>로그인</LoginButton>
              )}
            </UserSection>
          </NavLinks>
        </Nav>
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      </HeaderContainer>
    )
}

export default Header