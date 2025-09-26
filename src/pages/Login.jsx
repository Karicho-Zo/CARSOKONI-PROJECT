import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../features/user/userSlice'
import './Login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector(state => state.user)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic client-side validation
    if (!formData.email.trim() || !formData.password.trim()) {
      return
    }

    try {
      await dispatch(loginUser(formData)).unwrap()
      navigate('/')
    } catch {
      // Error is already handled by Redux, no need to do anything else
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-form-group">
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="login-input"
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="login-input"
            />
          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="login-submit-btn"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <p className="login-footer-text">
            Don't have an account?{' '}
            <Link to="/register" className="login-link">
              Register here
            </Link>
          </p>
        </div>

        <div className="login-demo">
          <div className="demo-credentials">
            <p className="demo-title">Demo Credentials:</p>
            <p className="demo-creds">
              <strong>Email:</strong> test@test.com<br />
              <strong>Password:</strong> password
            </p>
            <p className="demo-note">
              Use these credentials to test the login functionality
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login