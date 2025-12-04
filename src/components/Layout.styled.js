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

export const SignupButton = styled.button`
    background: linear-gradient(135deg, #526D82 0%, #27374D 100%);
    color: #DDE6ED;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: linear-gradient(135deg, #27374D 0%, #526D82 100%);
        color: #ffffff;
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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
    min-width: 700px;
    max-width: 1000px;
    width: 90%;
    max-height: 90vh;
    overflow: hidden;
    display: flex;
    gap: 24px;
    
    @media (max-width: 768px) {
        flex-direction: column;
        min-width: 90%;
        max-width: 90%;
    }
    
    &::-webkit-scrollbar {
        width: 8px;
    }
    
    &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 4px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: rgba(221, 230, 237, 0.5);
        border-radius: 4px;
        
        &:hover {
            background: rgba(221, 230, 237, 0.7);
        }
    }
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

export const TextArea = styled.textarea`
    padding: 12px 16px;
    border: 2px solid rgba(221, 230, 237, 0.3);
    border-radius: 8px;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.9);
    color: #27374D;
    transition: all 0.3s ease;
    font-family: inherit;
    resize: vertical;

    &:focus {
        outline: none;
        border-color: #DDE6ED;
        background: #ffffff;
    }

    &::placeholder {
        color: rgba(39, 55, 77, 0.5);
    }
`

export const Select = styled.select`
    padding: 12px 16px;
    border: 2px solid rgba(221, 230, 237, 0.3);
    border-radius: 8px;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.9);
    color: #27374D;
    transition: all 0.3s ease;
    font-family: inherit;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2327374D' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 40px;

    &:focus {
        outline: none;
        border-color: #DDE6ED;
        background-color: #ffffff;
    }

    option {
        background: #ffffff;
        color: #27374D;
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

export const IngredientSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

export const IngredientSelect = styled(Select)`
    width: 100%;
`

export const IngredientInputGroup = styled.div`
    display: flex;
    gap: 8px;
    align-items: flex-end;
    flex-wrap: wrap;
`

export const AmountInput = styled(Input)`
    flex: 1;
    text-align: center;
    min-width: 80px;
`

export const UnitSelect = styled(Select)`
    width: 100px;
    flex-shrink: 0;
`

export const AddIngredientButton = styled.button`
    padding: 12px 16px;
    background: rgba(39, 55, 77, 0.2);
    color: #DDE6ED;
    border: 2px solid rgba(221, 230, 237, 0.3);
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    flex-shrink: 0;

    &:hover {
        background: rgba(39, 55, 77, 0.3);
        border-color: #DDE6ED;
        color: #ffffff;
    }
`

export const IngredientList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 150px;
    overflow-y: auto;
    padding: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    
    &::-webkit-scrollbar {
        width: 6px;
    }
    
    &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
    }
    
    &::-webkit-scrollbar-thumb {
        background: rgba(221, 230, 237, 0.4);
        border-radius: 3px;
        
        &:hover {
            background: rgba(221, 230, 237, 0.6);
        }
    }
`

export const IngredientItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 6px;
    color: #27374D;
    font-size: 14px;
`

export const IngredientInfo = styled.span`
    flex: 1;
`

export const RemoveIngredientButton = styled.button`
    padding: 4px 8px;
    background: rgba(111, 78, 55, 0.1);
    color: #6F4E37;
    border: 1px solid rgba(111, 78, 55, 0.3);
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: rgba(111, 78, 55, 0.2);
        border-color: rgba(111, 78, 55, 0.5);
    }
`

export const ImageUploadSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

export const ImageInput = styled.input`
    display: none;
`

export const ImageInputLabel = styled.label`
    padding: 12px 16px;
    border: 2px solid rgba(221, 230, 237, 0.3);
    border-radius: 8px;
    font-size: 14px;
    background: rgba(255, 255, 255, 0.9);
    color: #27374D;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    font-weight: 600;

    &:hover {
        border-color: #DDE6ED;
        background: #ffffff;
    }
`

export const ImagePreview = styled.div`
    width: 100%;
    max-height: 200px;
    border-radius: 8px;
    overflow: hidden;
    border: 2px solid rgba(221, 230, 237, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
`

export const PreviewImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    max-height: 200px;
`

export const RemoveImageButton = styled.button`
    padding: 8px 16px;
    background: rgba(111, 78, 55, 0.1);
    color: #6F4E37;
    border: 1px solid rgba(111, 78, 55, 0.3);
    border-radius: 6px;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    align-self: center;

    &:hover {
        background: rgba(111, 78, 55, 0.2);
        border-color: rgba(111, 78, 55, 0.5);
    }
`

export const NotFoundImage = styled.img`
    width: 100%;
    max-width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
    border-radius: 12px;
`