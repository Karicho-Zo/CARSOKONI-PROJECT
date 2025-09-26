import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { describe, test, expect } from 'vitest'
import CarCard from '../components/CarCard'
import carsReducer from '../features/cars/carsSlice'
import cartReducer from '../features/cart/cartSlice'
import userReducer from '../features/user/userSlice'
import uiReducer from '../features/ui/uiSlice'
import audi from '../assets/cars/audi.jpg'
const createMockStore = () => {
  return configureStore({
    reducer: {
      cars: carsReducer,
      cart: cartReducer,
      user: userReducer,
      ui: uiReducer,
    },
  })
}

const mockCar = {
  id: 1,
  brand: 'Toyota',
  model: 'Camry',
  year: 2020,
  price: 25000,
  mileage: 15000,
  fuelType: 'Gasoline',
  category: 'Sedan',
  location: 'Nairobi',
  image: audi,
  description: 'Reliable sedan with excellent fuel economy.',
}

const renderWithProviders = (component) => {
  const store = createMockStore()
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  )
}

describe('CarCard', () => {
  test('renders car information correctly', () => {
    renderWithProviders(<CarCard car={mockCar} />)

    expect(screen.getByText('Toyota Camry')).toBeInTheDocument()
    expect(screen.getByText('2020')).toBeInTheDocument()
    expect(screen.getByText('$25,000')).toBeInTheDocument()
    expect(screen.getByText('Gasoline')).toBeInTheDocument()
    expect(screen.getByText('15,000 mi')).toBeInTheDocument()
  })

  test('displays car image', () => {
    renderWithProviders(<CarCard car={mockCar} />)

    const image = screen.getByAltText('Toyota Camry')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockCar.image)
  })

  test('has view details and add to cart buttons', () => {
    renderWithProviders(<CarCard car={mockCar} />)

    expect(screen.getByText('View Details')).toBeInTheDocument()
    expect(screen.getByText('Add to Cart')).toBeInTheDocument()
  })

  test('displays category badge', () => {
    renderWithProviders(<CarCard car={mockCar} />)

    expect(screen.getByText('Sedan')).toBeInTheDocument()
  })
})