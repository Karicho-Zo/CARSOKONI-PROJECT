import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { memo } from 'react'
import { Heart, Fuel, Gauge, Calendar } from 'lucide-react'
import { addToCart } from '../features/cart/cartSlice'
import './CarCard.css'

const CarCard = ({ car }) => {
  const dispatch = useDispatch()

  const handleAddToCart = (e) => {
    e.preventDefault()
    dispatch(addToCart(car))
  }

  return (
    <div className="car-card">
      {/* Image Section */}
      <div className="car-card-image-container">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="car-card-image"
          loading="lazy"
        />

        {/* Overlay with gradient */}
        <div className="car-card-overlay"></div>

        {/* Category badge */}
        <div className="car-card-category">
          <span className="car-card-category-badge">
            {car.category}
          </span>
        </div>

        {/* Quick action buttons on hover */}
        <div className="car-card-quick-actions">
          <button className="car-card-quick-btn">
            Quick View
          </button>
          <button className="car-card-contact-btn">
            Contact
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="car-card-content">
        {/* Header */}
        <div className="car-card-header">
          <div className="car-card-info">
            <h3>
              {car.brand} {car.model}
            </h3>
            <p>{car.year} • {car.location}</p>
          </div>
          <div className="car-card-price-section">
            <p className="car-card-price">
              Ksh{car.price.toLocaleString()}
            </p>
            <p className="car-card-price-label"></p>
          </div>
        </div>

        {/* Specifications */}
        <div className="car-card-specs">
          <div className="car-card-spec">
            <Fuel size={16} className="car-card-spec-icon" />
            <span className="car-card-spec-text">{car.fuelType}</span>
          </div>
          <div className="car-card-spec">
            <Gauge size={16} className="car-card-spec-icon" />
            <span className="car-card-spec-text">{car.mileage.toLocaleString()} mi</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="car-card-actions">
          <Link
            to={`/cars/${car.id}`}
            className="car-card-action-btn car-card-view-btn"
            aria-label={`View details for ${car.brand} ${car.model}`}
          >
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            className="car-card-action-btn car-card-add-btn"
            aria-label={`Add ${car.brand} ${car.model} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default memo(CarCard)