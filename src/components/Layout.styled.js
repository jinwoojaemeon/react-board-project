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
    background: linear-gradient(135deg, #FED8B1 0%, #ECB176 25%, #A67B5B 60%, #6F4E37 100%);
    border-radius: 12px;
    margin-top: 24px;
    box-shadow: 0 4px 20px rgba(111, 78, 55, 0.4), 
                inset 0 1px 3px rgba(254, 216, 177, 0.3),
                inset 0 -1px 3px rgba(111, 78, 55, 0.2);
    border: 1px solid rgba(111, 78, 55, 0.4);
    position: relative;
    
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                rgba(111, 78, 55, 0.05) 2px,
                rgba(111, 78, 55, 0.05) 4px
            );
        border-radius: 12px;
        pointer-events: none;
    }
`

export const UserSection = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`

export const LoginButton = styled.button`
    background: rgba(255, 255, 255, 0.2);
    color: #DDE6ED;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.3);
        color: #ffffff;
        transform: translateY(-1px);
    }
`

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    color: #DDE6ED;
    font-size: 14px;

    span {
        font-weight: 500;
    }
`

export const LogoutButton = styled.button`
    background: rgba(255, 255, 255, 0.15);
    color: #DDE6ED;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.25);
        color: #ffffff;
    }
`

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`

export const ModalContent = styled.div`
    background: linear-gradient(135deg, #9DB2BF 0%, #526D82 50%, #27374D 100%);
    padding: 32px;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    min-width: 320px;
    max-width: 400px;
    width: 90%;
`

export const ModalTitle = styled.h2`
    color: #DDE6ED;
    margin: 0 0 24px 0;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export const Input = styled.input`
    padding: 12px 16px;
    border: 2px solid rgba(221, 230, 237, 0.3);
    border-radius: 8px;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.9);
    color: #27374D;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: #DDE6ED;
        background: #ffffff;
    }

    &::placeholder {
        color: rgba(39, 55, 77, 0.5);
    }
`

export const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 8px;
`

export const LoginButtonModal = styled.button`
    flex: 1;
    padding: 12px;
    background: #27374D;
    color: #DDE6ED;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: #526D82;
        color: #ffffff;
        transform: translateY(-1px);
    }
`

export const CancelButton = styled.button`
    flex: 1;
    padding: 12px;
    background: rgba(221, 230, 237, 0.2);
    color: #DDE6ED;
    border: 2px solid rgba(221, 230, 237, 0.3);
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(221, 230, 237, 0.3);
        border-color: #DDE6ED;
        color: #ffffff;
    }
`
