import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="footer-brand-title">Carsokoni</h3>
            <p className="footer-brand-description">
              Your trusted marketplace for buying and selling cars. Find your dream car today!
            </p>
            <div className="footer-social-links">
              <a
                href="https://facebook.com/carsokoni"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Follow us on Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com/carsokoni"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Follow us on Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com/carsokoni"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-section-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cars" className="footer-link">
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-section-title">Categories</h4>
            <ul className="footer-links">
              <li>
                <Link to="/cars?category=SUV" className="footer-link">
                  SUVs
                </Link>
              </li>
              <li>
                <Link to="/cars?category=Sedan" className="footer-link">
                  Sedans
                </Link>
              </li>
              <li>
                <Link to="/cars?category=Hatchback" className="footer-link">
                  Hatchbacks
                </Link>
              </li>
              <li>
                <Link to="/cars?category=Luxury" className="footer-link">
                  Luxury Cars
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-section-title">Contact Info</h4>
            <div className="footer-links">
              <div className="footer-contact-item">
                <MapPin size={16} className="footer-contact-icon" />
                <span className="footer-contact-text">123 Car Street, Nairobi, Kenya</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={16} className="footer-contact-icon" />
                <span className="footer-contact-text">+254 123 456 789</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={16} className="footer-contact-icon" />
                <span className="footer-contact-text">info@carsokoni.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; 2025 Carsokoni. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer