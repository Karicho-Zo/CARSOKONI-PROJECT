import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCars } from '../features/cars/carsSlice';
import ProgressiveRevealCarCard from './ProgressiveRevealCarCard';
import './CarListings.css';

const CarListings = () => {
  const dispatch = useDispatch();
  const { items: carsData } = useSelector(state => state.cars);

  useEffect(() => {
    if (carsData.length === 0) {
      dispatch(fetchCars());
    }
  }, [dispatch, carsData.length]);

  // For now, use carsData directly from Redux
  const filteredAndSortedCars = carsData;

  return (
    <div className="car-listings-container">
      {/* Header */}
      <div className="car-listings-header">
        <h1 className="car-listings-title">Car Listings</h1>
        <p className="car-listings-subtitle">Find your perfect car from our collection</p>
      </div>


      {/* Results Count */}
      <div className="results-count">
        Showing {filteredAndSortedCars.length} of {carsData.length} cars
      </div>

      {/* Car Grid with Progressive Reveal */}
      <div className="car-grid">
        {filteredAndSortedCars.map((car, index) => (
          <ProgressiveRevealCarCard
            key={`${car.brand}-${car.model}-${car.id}`}
            car={car}
            delay={index * 200} // Stagger the reveal by 200ms for each card
          />
        ))}
      </div>

      {/* No Results */}
      {filteredAndSortedCars.length === 0 && (
        <div className="no-results">
          <h3 className="no-results-title">No cars found</h3>
          <p className="no-results-text">Try adjusting your search criteria or clearing filters</p>
        </div>
      )}
    </div>
  );
};

export default CarListings;