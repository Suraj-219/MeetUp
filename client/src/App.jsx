import React from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Sessions from './pages/Sessions.jsx'
import Pricing from './pages/Pricing.jsx'
import MeetingRoom from './pages/MeetingRoom.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Protectedlayout from './components/Protectedlayout.jsx'


const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        {/* Public routes */}
        <Route path='/login' element={ <Login mode="login"/> } />
        <Route path='/register' element={ <Login mode="register"/> } />


        {/* Private routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Protectedlayout />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/sessions' element={<Sessions />} />
            <Route path='/pricing' element={<Pricing />} />
          </Route>
          <Route path='/meeting/:meetingId' element={<MeetingRoom />} />
        </Route>

        {/* Other routes */}
        <Route path='*' element={<Navigate to='/dashboard' replace />} />

      </Routes>
    </>
  )
}

export default App