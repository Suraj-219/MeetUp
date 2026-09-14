import { useAuth } from '@clerk/react'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Loader from './Loader.jsx'

const ProtectedRoute = () => {

  const {isLoaded, isSignedIn} = useAuth()

  if(!isLoaded){
    return <Loader text='Authenticatin...' />
  }

  if(!isSignedIn){
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute