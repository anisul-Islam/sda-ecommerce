import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Login } from '../pages/users/Login'

const AdminRoute = () => {
  const location = useLocation()
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.usersR)

  return isLoggedIn && userData && userData.role === 'admin' ? (
    <Outlet />
  ) : (
    <Login pathName={location.pathname} />
  )
}

export default AdminRoute
