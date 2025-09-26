import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchCars } from '../features/cars/carsSlice'
import ProgressiveRevealCarCard from '../components/ProgressiveRevealCarCard'
import { ChevronRight, Star, Shield, Truck } from 'lucide-react'
import './Home.css'

const Home = () => {
  const dispatch = useDispatch()
  const { items: cars, loading } = useSelector(state => state.cars)

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(fetchCars())
    }
  }, [dispatch, cars.length])

  const featuredCars = cars.slice(0, 6)

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text-center">
            <h1 className="hero-title">
              Find Your Perfect
              <span>Car Today</span>
            </h1>
            <p className="hero-subtitle">
              Discover amazing deals on quality vehicles from trusted sellers across Kenya.
              Your dream car is just a few clicks away.
            </p>

            {/* Quick Search */}
            <div className="hero-search-container">
              <div className="hero-search-form">
                <div className="hero-search-grid">
                  <div className="hero-search-input-group">
                    <input
                      type="text"
                      placeholder="Search by make, model, or keyword..."
                      className="hero-search-input"
                    />
                  </div>
                  <select className="hero-search-select">
                    <option value="">Any Price</option>
                    <option value="0-500000">0 - 500,000</option>
                    <option value="500000-5000000">500,000 - 5,000,000</option>
                    <option value="5000000-10000000">5,000,000 - 10,000,000</option>
                    <option value="10000000+">10,000,000+</option>
                  </select>
                  <Link
                    to="/cars"
                    className="hero-search-button"
                  >
                    Search Cars
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              <div className="hero-stat-item">
                <div className="hero-stat-number">500+</div>
                <div className="hero-stat-label">Cars Available</div>
              </div>
              <div className="hero-stat-item">
                <div className="hero-stat-number">50+</div>
                <div className="hero-stat-label">Verified Sellers</div>
              </div>
              <div className="hero-stat-item">
                <div className="hero-stat-number">98%</div>
                <div className="hero-stat-label">Satisfaction Rate</div>
              </div>
              <div className="hero-stat-item">
                <div className="hero-stat-number">24/7</div>
                <div className="hero-stat-label">Customer Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="hero-decoration-1"></div>
        <div className="hero-decoration-2"></div>
        <div className="hero-decoration-3"></div>
      </section>


      {/* Featured Cars */}
      <section className="featured-section">
        <div className="featured-container">
          <div className="featured-header">
            <h2 className="featured-title">
              Featured Vehicles
            </h2>
            <p className="featured-subtitle">
              Handpicked premium cars from our most trusted sellers
            </p>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="text-center">
                <div className="loading-spinner"></div>
                <p className="loading-text">Loading featured cars...</p>
              </div>
            </div>
          ) : (
            <div className="featured-grid">
              {featuredCars.slice(0, 6).map((car, index) => (
                <ProgressiveRevealCarCard
                  key={car.id}
                  car={car}
                  delay={index * 150}
                />
              ))}
            </div>
          )}

          <div className="featured-cta">
            <Link
              to="/cars"
              className="featured-button"
            >
              View All Cars
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-section">
        <div className="why-choose-container">
          <div className="why-choose-header">
            <h2 className="why-choose-title">
              Why Choose Carsokoni?
            </h2>
            <p className="why-choose-subtitle">
              We're committed to providing the best car buying experience in Kenya
            </p>
          </div>

          <div className="why-choose-grid">
            <div className="why-choose-card">
              <div className="why-choose-icon" style={{ backgroundColor: '#2563eb' }}>
                <Shield size={32} className="text-white" />
              </div>
              <h3 className="why-choose-card-title">Verified Sellers</h3>
              <p className="why-choose-description">
                Every seller on our platform is thoroughly vetted and verified for your peace of mind
              </p>
            </div>

            <div className="why-choose-card">
              <div className="why-choose-icon" style={{ backgroundColor: '#059669' }}>
                <Truck size={32} className="text-white" />
              </div>
              <h3 className="why-choose-card-title">Nationwide Delivery</h3>
              <p className="why-choose-description">
                Professional transportation services to deliver your car anywhere in Kenya
              </p>
            </div>

            <div className="why-choose-card">
              <div className="why-choose-icon" style={{ backgroundColor: '#d97706' }}>
                <Star size={32} className="text-white" />
              </div>
              <h3 className="why-choose-card-title">Quality Guarantee</h3>
              <p className="why-choose-description">
                30-day money-back guarantee and comprehensive vehicle inspection reports
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="newsletter-container">
          <h2 className="newsletter-title">
            Stay Updated with Latest Deals
          </h2>
          <p className="newsletter-subtitle">
            Get notified about new car listings and exclusive deals in your inbox
          </p>

          <div className="newsletter-form-container">
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="newsletter-button"
              >
                Subscribe
              </button>
            </form>
            <p className="newsletter-disclaimer">
              Join 10,000+ car enthusiasts. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home