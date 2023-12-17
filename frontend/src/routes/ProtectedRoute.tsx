import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Login } from '../pages/users/Login'

const ProtectedRoute = () => {
  const location = useLocation()
  const { isLoggedIn } = useSelector((state: RootState) => state.usersR)

  return isLoggedIn ? <Outlet /> : <Login pathName={location.pathname} />
}

export default ProtectedRoute
