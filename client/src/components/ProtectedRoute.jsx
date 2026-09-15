import { useAuth } from '@clerk/react'
import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Loader from './Loader.jsx'

const ProtectedRoute = () => {

  const {isLoaded, isSignedIn, getToken} = useAuth()

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const syncUser = async () => {
      const token = await getToken();
      await fetch('http://localhost:3000/api/users/sync', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    };

    syncUser().catch((error) => console.error('Unable to sync user:', error));
  }, [getToken, isLoaded, isSignedIn])

  if(!isLoaded){
    return <Loader text='Authenticatin...' />
  }

  if(!isSignedIn){
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute