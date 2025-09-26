import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import { logoutUser } from '../features/user/userSlice'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { itemCount } = useSelector(state => state.cart)
  const { isAuthenticated, userInfo } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/')
  }

  return (
    <nav>
      <div className="navbar-container">
        <div className="navbar-main">
          <div className="navbar-brand">
            <Link to="/" className="navbar-brand-link">
              Carsokoni
            </Link>
          </div>

          <div className="navbar-nav">
            <Link to="/" className="navbar-nav-link">
              Home
            </Link>
            <Link to="/cars" className="navbar-nav-link">
              Cars
            </Link>
            <Link to="/about" className="navbar-nav-link">
              About
            </Link>
            <Link to="/contact" className="navbar-nav-link">
              Contact
            </Link>
          </div>

          <div className="navbar-actions">
            <Link to="/cart" className="navbar-cart">
              <ShoppingCart className="navbar-cart-icon" />
              {itemCount > 0 && (
                <span className="navbar-cart-badge">
                  {itemCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="navbar-user">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="navbar-user-button"
                >
                  <img
                    src={userInfo.avatar}
                    alt={userInfo.name}
                    className="navbar-user-avatar"
                  />
                  <span className="navbar-user-name">{userInfo.name}</span>
                </button>
                {isOpen && (
                  <div className="navbar-user-dropdown">
                  <Link
                    to="/profile"
                    className="navbar-user-dropdown-link"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="navbar-user-dropdown-button"
                  >
                    Logout
                  </button>
                </div>
                )}
              </div>
            ) : (
              <div className="navbar-auth">
                <Link to="/login" className="navbar-auth-link">
                  Login
                </Link>
                <Link to="/register" className="navbar-auth-link">
                  Register
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="navbar-mobile-toggle"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="navbar-mobile-menu">
      <div className="navbar-mobile-menu-content">
        <Link
          to="/"
          className="navbar-mobile-menu-link"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/cars"
          className="navbar-mobile-menu-link"
          onClick={() => setIsOpen(false)}
        >
          Cars
        </Link>
        <Link
          to="/about"
          className="navbar-mobile-menu-link"
          onClick={() => setIsOpen(false)}
        >
          About
        </Link>
        <Link
          to="/contact"
          className="navbar-mobile-menu-link"
          onClick={() => setIsOpen(false)}
        >
          Contact
        </Link>


        {!isAuthenticated && (
          <>
            <Link
              to="/login"
              className="navbar-mobile-menu-link"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="navbar-mobile-menu-link"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar