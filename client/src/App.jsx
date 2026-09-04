import React from 'react'
import { Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'


const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        {/* Public routes */}
        <Route path='/login' elements={ <Login mode="login"/> } />
        <Route path='/register' elements={ <Login mode="register"/> } />


        {/* Private routes */}

        {/* Other routes */}

      </Routes>
    </>
  )
}

export default App