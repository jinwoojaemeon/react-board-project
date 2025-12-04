import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Recipes from '../pages/Recipes'
import Lab from '../pages/Lab'
import LabBoard from '../pages/LabBoard'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Layout from '../components/Layout'
import { ROUTES } from './routes' 
import NotFound from '../pages/NotFound'
const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path={ROUTES.RECIPE} element={<Recipes />} />
                <Route path={ROUTES.LAB} element={<Lab />} />
                <Route path={ROUTES.LABBOARD} element={<LabBoard />} />
                <Route path={ROUTES.SIGNUP} element={<Signup />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.NOTFOUND} element={<NotFound />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

