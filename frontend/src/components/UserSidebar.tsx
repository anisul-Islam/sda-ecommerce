import React from 'react'

import { Link } from 'react-router-dom'
import useUserState from '../hooks/useUserState'

const UserSidebar = () => {
  const { userData } = useUserState()
  return (
    <aside className="sidebar">
      <div>
        <h2>User Profile</h2>
        <p>{`${userData?.firstName} ${userData?.lastName}`}</p>
        <p>{userData?.email}</p>
      </div>

      <br />
      <div>
        <ul>
          <li>
            <Link to="/dashboard/user/profile" className="nav__link">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/dashboard/user/orders" className="nav__link">
              Orders
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default UserSidebar
