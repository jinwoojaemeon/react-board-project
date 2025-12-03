import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Recipes from '../pages/Recipes'
import Lab from '../pages/Lab'
import LabBoard from '../pages/LabBoard'
import Layout from '../components/Layout'
import { ROUTES } from './routes' 
const AppRoutes = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path={ROUTES.RECIPE} element={<Recipes />} />
                <Route path={ROUTES.LAB} element={<Lab />} />
                <Route path={ROUTES.LABBOARD} element={<LabBoard />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

