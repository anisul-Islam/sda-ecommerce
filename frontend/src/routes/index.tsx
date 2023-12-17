import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/users/Home'
import AdminDashboard from '../pages/admin/AdminDashboard'
import Category from '../components/Category'
import Products from '../components/Products'
import ProductDetails from '../pages/users/ProductDetails'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

import UserDashboard from '../pages/users/UserDashboard'
import UserProfile from '../pages/users/UserProfile'
import UserOrders from '../components/UserOrders'
import { Login } from '../pages/users/Login'
import UsersList from '../components/UsersList'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'
import Register from '../pages/users/Register'
import Cart from '../pages/Cart'
import ActivatePage from '../pages/users/ActivatePage'

const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />

          <Route path="/login" element={<Login pathName="" />} />
          <Route path="/logout" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product" element={<ProductDetails />} />
          <Route path="/user/activate/:token" element={<ActivatePage />} />

          {/* <Route path="/dashboard" element={<ProtectedRoute />}> */}
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<UserOrders />} />
          {/* </Route> */}

          {/* <Route path="/dashboard" element={<AdminRoute />}> */}
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/category" element={<Category />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/users" element={<UsersList />} />
          <Route path="admin/orders" element={<UserOrders />} />
          {/* </Route> */}

          {/* <Route path="*" element={<Error />} /> */}
        </Routes>
      </>
      <Footer />
    </BrowserRouter>
  )
}

export default Index

// 1. Listing all users
// 2. searching
// 3. delete the user
// 4. ban/unban
// 5. register the user
// 6. activate the user

//  npm install --save-dev vite-plugin-rewrite-all
