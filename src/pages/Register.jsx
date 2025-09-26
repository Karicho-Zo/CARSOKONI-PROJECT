import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, Trash2, AlertCircle } from 'lucide-react';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [storageStatus, setStorageStatus] = useState({
    hasStoredData: false,
    storageError: null,
    isLoading: false
  });

  // Local Storage Key
  const STORAGE_KEY = 'carsokoni_registration_data';

  // Save data to localStorage with error handling
  const saveToLocalStorage = (data) => {
    try {
      setStorageStatus(prev => ({ ...prev, isLoading: true, storageError: null }));

      // Check if we have enough space
      const testData = JSON.stringify({ test: 'test' });
      if (testData.length > 5000000) { // 5MB limit check
        throw new Error('Data too large for localStorage');
      }

      const dataToStore = {
        ...data,
        timestamp: new Date().toISOString(),
        agreeToTerms: agreeToTerms
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
      setStorageStatus(prev => ({ ...prev, hasStoredData: true, isLoading: false }));

      return true;

    } catch (error) {
      let errorMessage = 'Failed to save data';
      if (error.name === 'QuotaExceededError' || error.message.includes('storage')) {
        errorMessage = 'Storage quota exceeded. Please clear some browser data.';
      } else if (error.message.includes('localStorage')) {
        errorMessage = 'Browser storage is disabled or unavailable.';
      }

      setStorageStatus(prev => ({
        ...prev,
        storageError: errorMessage,
        isLoading: false
      }));

      return false;
    }
  };

  // Load data from localStorage
  const loadFromLocalStorage = () => {
    try {
      setStorageStatus(prev => ({ ...prev, isLoading: true, storageError: null }));

      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedData = JSON.parse(stored);

        // Check if data is not too old (24 hours)
        const storedTime = new Date(parsedData.timestamp);
        const now = new Date();
        const hoursDiff = (now - storedTime) / (1000 * 60 * 60);

        if (hoursDiff < 24) {
          setFormData({
            fullName: parsedData.fullName || '',
            email: parsedData.email || '',
            password: '', // Never restore password for security
            confirmPassword: '' // Never restore password confirmation
          });

          if (parsedData.agreeToTerms !== undefined) {
            setAgreeToTerms(parsedData.agreeToTerms);
          }

          setStorageStatus(prev => ({
            ...prev,
            hasStoredData: true,
            isLoading: false
          }));

        } else {
          // Data is too old, remove it
          localStorage.removeItem(STORAGE_KEY);
          setStorageStatus(prev => ({
            ...prev,
            hasStoredData: false,
            isLoading: false
          }));
          
        }
      } else {
        setStorageStatus(prev => ({
          ...prev,
          hasStoredData: false,
          isLoading: false
        }));
      }

    } catch (error) {
      console.error('❌ Error loading from localStorage:', error);
      setStorageStatus(prev => ({
        ...prev,
        storageError: 'Failed to load saved data',
        isLoading: false
      }));
    }
  };

  // Clear stored data
  const clearStoredData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setFormData({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setAgreeToTerms(false);
      setStorageStatus(prev => ({
        ...prev,
        hasStoredData: false,
        storageError: null
      }));

      console.log('🗑️ Stored data cleared');
    } catch (error) {
      console.error('❌ Error clearing localStorage:', error);
      setStorageStatus(prev => ({
        ...prev,
        storageError: 'Failed to clear stored data'
      }));
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms agreement validation
    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const submissionData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        agreeToTerms
      };

      console.log('Registration form submitted:', submissionData);

      // Save to localStorage
      const saved = saveToLocalStorage({
        fullName: formData.fullName,
        email: formData.email
      });

      if (saved) {
        // Here you would typically send the data to your backend
        alert('Registration successful! Data saved locally. Check the console for form data.');
      } else {
        alert('Registration form submitted but failed to save locally. Check console for details.');
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h1 className="register-brand-title">Carsokoni</h1>
            <p className="register-subtitle">Join the Marketplace</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email address"
                  required
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password-toggle"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="checkbox-input"
                />
                <span className="checkbox-text">
                  I agree to the{' '}
                  <Link to="/terms" className="terms-link">
                    Terms and Conditions
                  </Link>
                </span>
              </label>
              {errors.terms && <span className="error-message">{errors.terms}</span>}
            </div>

            <button
              type="submit"
              className="register-button"
            >
              Create Account
            </button>

            <div className="login-redirect">
              <p className="login-text">
                Already have an account?{' '}
                <Link to="/login" className="login-link">
                  Sign in here
                </Link>
              </p>
            </div>

            {/* Storage Status and Controls */}
            <div className="storage-section">
              {storageStatus.hasStoredData && (
                <div className="storage-info">
                  <div className="storage-status">
                    <span className="storage-indicator saved"></span>
                    <span className="storage-text">Previous data restored</span>
                  </div>
                </div>
              )}

              {storageStatus.storageError && (
                <div className="storage-error">
                  <AlertCircle size={16} className="error-icon" />
                  <span className="error-text">{storageStatus.storageError}</span>
                </div>
              )}

              {storageStatus.hasStoredData && (
                <button
                  type="button"
                  onClick={clearStoredData}
                  className="clear-storage-button"
                  disabled={storageStatus.isLoading}
                >
                  <Trash2 size={16} />
                  Clear Saved Data
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register