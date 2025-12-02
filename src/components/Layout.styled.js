import { Link } from "react-router-dom"
import styled from "styled-components"

export const LayoutContainer = styled.div`
    min-height: 100vh;
    background: linear-gradient(135deg, #DDE6ED 0%, #9DB2BF 50%, #526D82 100%);
`

export const HeaderContainer = styled.header`
    background: linear-gradient(135deg, #9DB2BF 0%, #526D82 50%, #27374D 100%);
    padding: 0 24px;
    box-shadow: 0 2px 8px rgba(39, 55, 77, 0.2);
`

export const Nav = styled.nav`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
`

export const Logo = styled(Link)`
    font-size: 24px;
    font-weight: 900;
    color: #27374D;
    text-decoration: none;
    text-shadow: 0 1px 2px rgba(157, 178, 191, 0.3);
    transition: all 0.3s ease;

    &:hover{
        color: #526D82;
        transform: scale(1.05);
        text-shadow: 0 2px 4px rgba(39, 55, 77, 0.3);
    }
`

export const NavLinks = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`

export const NavLink = styled(Link)`
    color: #DDE6ED;
    text-decoration: none;
    font-size: 16px;
    padding: 8px 0;
    transition: all 0.3s ease;
    font-weight: 600;
    position: relative;
    
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, #9DB2BF 0%, #DDE6ED 100%);
        transition: width 0.3s ease;
    }
    
    &:hover{
        color: #ffffff;
        
        &::after {
            width: 100%;
        }
    }

    &.active{
        color: #ffffff;
        font-weight: 700;
        
        &::after {
            width: 100%;
            background: linear-gradient(90deg, #DDE6ED 0%, #9DB2BF 100%);
        }
    }
`

export const MainContent = styled.main`
    max-width: 1200px;
    margin: 0 auto;
    padding: 24px;
    background: rgba(221, 230, 237, 0.3);
    border-radius: 12px;
    margin-top: 24px;
    box-shadow: 0 4px 12px rgba(39, 55, 77, 0.1);
`
