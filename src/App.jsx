import { useState } from 'react'
import AppRoutes from './routes/Routes'
import { AuthProvider } from './contexts/AuthContext'
import './App.css'

function App() {

  return (
    <AuthProvider>
      <AppRoutes />  
    </AuthProvider>
  )
}

export default App
