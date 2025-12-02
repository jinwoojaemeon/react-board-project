import React from 'react'
import { LayoutContainer, MainContent } from './Layout.styled'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <LayoutContainer>
        <Header />
        <MainContent>
            <Outlet /> {/* Routes에서 넘겨준 children props를 Outlet라는 컴포넌트로 가져올 수 있다. */}
        </MainContent>
    </LayoutContainer>
  )
}

export default Layout