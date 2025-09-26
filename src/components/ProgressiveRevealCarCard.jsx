import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { memo, useState, useEffect } from 'react'
import { Fuel, Gauge } from 'lucide-react'
import { addToCart } from '../features/cart/cartSlice'
import './ProgressiveRevealCarCard.css'

const ProgressiveRevealCarCard = ({ car, delay = 0 }) => {
  const dispatch = useDispatch()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const handleAddToCart = (e) => {
    e.preventDefault()
    dispatch(addToCart(car))
  }

  return (
    <div className={`car-card ${isVisible ? 'visible' : ''}`}>
      {/* Category Badge */}
      <div className="car-category">
        <span className="car-category-text">{car.category}</span>
      </div>

      {/* Car Image */}
      <div className="car-image-container">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="car-image"
          loading="lazy"
        />
      </div>

      {/* Car Info */}
      <div className="car-info">
        <h3 className="car-title">{car.brand} {car.model}</h3>
        <div className="car-price-details">
          <span className="car-price">Ksh{car.price.toLocaleString()}</span>
        </div>
      </div>

      {/* Car Specs */}
      <div className="car-specs">
        <div className="car-spec">
          <Fuel size={16} className="spec-icon" />
          <span className="spec-text">{car.fuelType}</span>
        </div>
        <div className="car-spec">
          <Gauge size={16} className="spec-icon" />
          <span className="spec-text">{car.mileage.toLocaleString()} mi</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="car-actions">
        <Link
          to={`/cars/${car.id}`}
          className="btn btn-primary"
          aria-label={`View details for ${car.brand} ${car.model}`}
        >
          View Details
        </Link>
        <button
          onClick={handleAddToCart}
          className="btn btn-secondary"
          aria-label={`Add ${car.brand} ${car.model} to cart`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default memo(ProgressiveRevealCarCard)