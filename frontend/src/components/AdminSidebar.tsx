import React from 'react'
import { Link } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <aside className="sidebar">
      <div className="admin-profile">
        <h2>Admin Profile</h2>
        <p>Anisul Islam</p>
        <p>anisul200s@yahoo.co.uk</p>
      </div>

      <ul>
        <li>
          <Link to="/dashboard/admin/category">Category</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/products">Products</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/users">Users</Link>
        </li>
        <li>
          <Link to="/dashboard/admin/orders">Orders</Link>
        </li>
      </ul>
    </aside>
  )
}

export default AdminSidebar
