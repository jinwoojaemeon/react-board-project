import React from 'react'
import { HeaderContainer, Nav, Logo, NavLinks, NavLink } from './Layout.styled'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ROUTES } from '../constants/routes'

const Header = () => {
    const location = useLocation();

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
          </NavLinks>
        </Nav>
      </HeaderContainer>
    )
}

export default Header