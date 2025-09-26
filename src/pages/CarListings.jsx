import { useState, useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCars, sortCars } from '../features/cars/carsSlice'
import ProgressiveRevealCarCard from '../components/ProgressiveRevealCarCard'
import { Search, Filter, Grid, List } from 'lucide-react'
import './CarListings.css'

const CarListings = () => {
  const dispatch = useDispatch()
  const { items: allCars, loading, filters, sortBy } = useSelector(state => state.cars)
  const [viewMode, setViewMode] = useState('grid')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (allCars.length === 0 && !loading) {
      dispatch(fetchCars())
    }
  }, [dispatch, allCars.length, loading])

  const filteredCars = useMemo(() => {
    let filtered = [...allCars]

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(car =>
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply filters
    if (filters.brands.length > 0) {
      filtered = filtered.filter(car => filters.brands.includes(car.brand))
    }
    if (filters.categories.length > 0) {
      filtered = filtered.filter(car => filters.categories.includes(car.category))
    }
    if (filters.years.length > 0) {
      filtered = filtered.filter(car => filters.years.includes(car.year))
    }
    if (filters.location) {
      filtered = filtered.filter(car => car.location.toLowerCase().includes(filters.location.toLowerCase()))
    }
    filtered = filtered.filter(car =>
      car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]
    )

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'year-newest':
        filtered.sort((a, b) => b.year - a.year)
        break
      case 'year-oldest':
        filtered.sort((a, b) => a.year - b.year)
        break
      default:
        break
    }

    return filtered
  }, [allCars, filters, sortBy, searchTerm])

  const handleSearch = (e) => {
    e.preventDefault()
    // Search is now handled by the debounced effect
  }

  return (
    <div className="car-listings-container">
      {/* Header Section */}
      <div className="car-listings-header">
        <div className="car-listings-header-content">
          <div className="car-listings-header-text">
            <h1 className="car-listings-title">
              Find Your Perfect Car
            </h1>
            <p className="car-listings-subtitle">
              Browse our extensive collection of quality vehicles from trusted sellers across Kenya
            </p>
          </div>

          {/* Advanced Search */}
          <div className="car-listings-search">
            <form onSubmit={handleSearch} className="car-listings-search-form">
              <div className="car-listings-search-grid">
                {/* Search Input */}
                <div className="car-listings-search-input-group">
                  <Search className="car-listings-search-icon" />
                  <input
                    type="text"
                    placeholder="Search by make, model, or keyword..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="car-listings-search-input"
                    aria-label="Search cars"
                  />
                </div>

                {/* Price Range */}
                <select className="car-listings-search-select">
                  <option value="">Any Price</option>
                  <option value="500000-1000000">Ksh500,000 - Ksh1,000,000</option>
                  <option value="1000000-5000000">Ksh1,000,000 - Ksh5,000,000</option>
                  <option value="5000000-10000000">Ksh5,000,000 - 10,000,000</option>
                  <option value="10000000+">Ksh10,000,000+</option>
                </select>

                {/* Search Button */}
                <button
                  type="submit"
                  className="car-listings-search-button"
                >
                  Search Cars
                </button>
              </div>

              {/* Quick Filters */}
              <div className="car-listings-filters">
                <span className="car-listings-filter-label">Quick filters:</span>
                <button className="car-listings-filter-btn car-listings-filter-btn-suv">
                  SUVs
                </button>
                <button className="car-listings-filter-btn car-listings-filter-btn-luxury">
                  Luxury
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="car-listings-main">
        {/* Results Header */}
        <div className="car-listings-results-header">
          <div className="car-listings-results-info">
            <h2 className="car-listings-results-info-title">
              {filteredCars.length} Cars Available
            </h2>
            <p className="car-listings-results-info-text">
              {searchTerm ? `Results for "${searchTerm}"` : 'Showing all available cars'}
            </p>
          </div>

          <div className="car-listings-controls">
            {/* Sort Options */}
            <div className="car-listings-sort">
              <span className="car-listings-sort-label">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => dispatch(sortCars(e.target.value))}
                className="car-listings-sort-select"
                aria-label="Sort cars"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="year-newest">Year: Newest</option>
                <option value="year-oldest">Year: Oldest</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="car-listings-view-toggle">
              <button
                onClick={() => setViewMode('grid')}
                className={`car-listings-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                aria-label="Grid view"
                aria-pressed={viewMode === 'grid'}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`car-listings-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                aria-label="List view"
                aria-pressed={viewMode === 'list'}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="car-listings-loading">
            <div className="car-listings-loading-content">
              <div className="car-listings-loading-spinner"></div>
              <p className="car-listings-loading-text">Finding the perfect cars for you...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Cars Grid with Progressive Reveal */}
            <div className={`car-listings-grid ${viewMode === 'grid' ? 'grid' : 'list'}`}>
              {filteredCars.map((car, index) => (
                <div
                  key={car.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <ProgressiveRevealCarCard car={car} delay={index * 150} />
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {filteredCars.length >= 12 && (
              <div className="car-listings-load-more">
                <button className="car-listings-load-more-btn">
                  Load More Cars
                </button>
              </div>
            )}
          </>
        )}

        {/* No Results */}
        {filteredCars.length === 0 && !loading && (
          <div className="car-listings-no-results">
            <div className="car-listings-no-results-card">
              <div className="car-listings-no-results-icon">🔍</div>
              <h3 className="car-listings-no-results-title">
                No cars found
              </h3>
              <p className="car-listings-no-results-message">
                We couldn't find any cars matching your search criteria. Try adjusting your filters or search terms.
              </p>
              <div className="car-listings-no-results-actions">
                <button
                  onClick={() => setSearchTerm('')}
                  className="car-listings-no-results-btn primary"
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="car-listings-no-results-btn secondary"
                >
                  Browse All Cars
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CarListings