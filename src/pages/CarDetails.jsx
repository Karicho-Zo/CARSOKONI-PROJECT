import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { addToCart } from '../features/cart/cartSlice'
import { fetchCarById } from '../features/cars/carsSlice'
import { ChevronLeft, Heart, Share2, Fuel, Gauge, Calendar, Settings, Palette, Loader2 } from 'lucide-react'
import useScrollPersistence from '../components/useScrollPersistence'
import '../components/CarDetails.css'

const CarDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { items: cars, loading, error } = useSelector(state => state.cars)
  const [selectedImage, setSelectedImage] = useState(0)

  // Use scroll persistence hook with unique key for car details
  const scrollKey = `car-details-${id}`
  useScrollPersistence(scrollKey)

  const car = cars.find(c => c.id === parseInt(id))

  useEffect(() => {
    // Always try to fetch the car when component mounts or ID changes
    // This ensures persistence across page refreshes
    if (id && (!car || car.id !== parseInt(id))) {
      dispatch(fetchCarById(id))
    }
  }, [id, car, dispatch])

  // Show loading state while fetching car data
  if (loading) {
    return (
      <div className="car-details-container">
        <div className="car-details-loading">
          <Loader2 className="car-details-loading-spinner" size={48} />
          <p className="car-details-loading-text">Loading car details...</p>
        </div>
      </div>
    )
  }

  // Show error state if car fetch failed
  if (error) {
    return (
      <div className="car-details-container">
        <div className="car-details-error">
          <p className="car-details-error-text">{error}</p>
          <button
            onClick={() => navigate('/cars')}
            className="car-details-error-button"
          >
            Back to Cars
          </button>
        </div>
      </div>
    )
  }

  // Show not found if car is still not available after loading
  if (!car) {
    return (
      <div className="car-details-container">
        <div className="car-details-error">
          <p className="car-details-error-text">Car not found.</p>
          <button
            onClick={() => navigate('/cars')}
            className="car-details-error-button"
          >
            Back to Cars
          </button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    dispatch(addToCart(car))
  }

  const images = [car.image, car.image, car.image] // Mock multiple images

  return (
    <div className="car-details-container">
      <Link to="/cars" className="car-details-back-button">
        <ChevronLeft size={16} />
        Back to listings
      </Link>

      <div className="car-details-main-grid">
        {/* Image Gallery */}
        <div className="car-details-gallery">
          <div className="car-details-main-image-container">
            <img
              src={images[selectedImage]}
              alt={`${car.brand} ${car.model}`}
              className="car-details-main-image"
            />
            <div className="car-details-image-actions">
              <button className="car-details-action-button">
                <Heart size={20} />
              </button>
              <button className="car-details-action-button">
                <Share2 size={20} />
              </button>
            </div>
          </div>
          <div className="car-details-thumbnails">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`car-details-thumbnail-button ${
                  selectedImage === index ? 'active' : ''
                }`}
              >
                <img src={img} alt="" />
              </button>
            ))}
          </div>
        </div>

        {/* Car Details */}
        <div className="car-details-info">
          <h1 className="car-details-title">{car.brand} {car.model}</h1>
          <p className="car-details-price">Ksh{car.price.toLocaleString()}</p>

          <div className="car-details-specs-grid">
            <div className="car-details-spec-item">
              <Calendar size={16} />
              <span>{car.year}</span>
            </div>
            <div className="car-details-spec-item">
              <Fuel size={16} />
              <span>{car.fuelType}</span>
            </div>
            <div className="car-details-spec-item">
              <Gauge size={16} />
              <span>{car.mileage.toLocaleString()} mi</span>
            </div>
            <div className="car-details-spec-item">
              <Settings size={16} />
              <span>Automatic</span>
            </div>
          </div>

          <div className="car-details-description">
            <h3 className="car-details-description-title">Description</h3>
            <p className="car-details-description-text">{car.description}</p>
          </div>

          <div className="car-details-action-buttons">
            <button onClick={handleAddToCart} className="car-details-action-button-primary">
              Add to Cart
            </button>
            <button className="car-details-action-button-secondary">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="car-details-specifications">
        <h2 className="car-details-specifications-title">Specifications</h2>
        <div className="car-details-specs-cards">
          <div className="car-details-spec-card">
            <h3 className="car-details-spec-card-title">Engine</h3>
            <p className="car-details-spec-card-text">2.0L Turbo</p>
          </div>
          <div className="car-details-spec-card">
            <h3 className="car-details-spec-card-title">Transmission</h3>
            <p className="car-details-spec-card-text">Automatic</p>
          </div>
          <div className="car-details-spec-card">
            <h3 className="car-details-spec-card-title">Color</h3>
            <p className="car-details-spec-card-text">Pearl White</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetails