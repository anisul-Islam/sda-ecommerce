import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { AppDispatch, RootState } from '../../redux/store'
import { logout } from '../../redux/slices/users/userSlice'
import CartIconElement from '../CartIconElement'

const Navbar = () => {
  const { isLoggedIn, userData } = useSelector((state: RootState) => state.usersR)
  const { cartItems } = useSelector((state: RootState) => state.cartR)

  const dispatch: AppDispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="flex-center">
      <ul className=" nav__lists flex-space-around">
        {isLoggedIn && (
          <>
            <li>
              <Link to="/logout" onClick={handleLogout} className="nav__link">
                Logout
              </Link>
            </li>

            <li>
              <Link to={`/dashboard/${userData.role}`} className="nav__link">
                {userData.role} Dashboard
              </Link>
            </li>
          </>
        )}

        {!isLoggedIn && (
          <>
            <li>
              <Link to="/register" className="nav__link">
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav__link">
                Login
              </Link>
            </li>
          </>
        )}
        <li>
          <Link to="/" className="nav__link">
            Home
          </Link>
        </li>

        <li>
          <Link to="/cart" className="nav__link">
            <CartIconElement value={cartItems.length > 0 ? cartItems.length : 0} />
          </Link>
        </li>

        <li>
          <Link to="/contact" className="nav__link">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
