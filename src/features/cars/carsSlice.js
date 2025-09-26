import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Ford from '../../assets/Ford.jpg';
import Audi from '../../assets/Audi.jpg';
import Mercedes from '../../assets/Mercedes.jpg';
import RangeRover from '../../assets/Range Rover.jpg';
import Volkswagen from '../../assets/Volkswagen.png';
import Volvo from '../../assets/Volvo.jpg';
import Nissan from '../../assets/Nissan Altima.jpg';
import Hyundai from '../../assets/Hyundai Tucson.jpg';

// Mock car data
const mockCars = [
  {
    id: 1,
    brand: 'Audi',
    model: 'A4',
    year: 2023,
    price: 2500000,
    mileage: 15000,
    fuelType: 'Gasoline',
    category: 'Sedan',
    location: 'Nairobi',
    image: Audi,
    description: 'Reliable sedan with excellent fuel economy.',
  },
  {
    id: 2,
    brand: 'Volkswagen',
    model: 'Golf',
    year: 2024,
    price: 2000000,
    mileage: 2000,
    fuelType: 'Diesel',
    category: 'Sedan',
    location: 'Nairobi',
    image: Volkswagen,
    description: 'Sporty and efficient compact car.',
  },
  {
    id: 3,
    brand: 'Ford',
    model: 'F-150',
    year: 2025,
    price: 8500000,
    mileage: 6000,
    fuelType: 'Hybrid',
    category: 'SUV',
    location: 'Mombasa',
    image: Ford,
    description: 'Spacious SUV perfect for family trips.',
  },
  {
    id: 4,
    brand: 'Volvo',
    model: 'S90',
    year: 2024,
    price: 10500000,
    mileage: 5000,
    fuelType: 'Hybrid',
    category: 'SUV',
    location: 'Nairobi',
    image: Volvo,
    description: 'Luxury SUV with premier features.',
  },
  {
    id: 5,
    brand: 'Range Rover',
    model: 'Sport',
    year: 2025,
    price: 9500000,
    mileage: 1200,
    fuelType: 'Gasoline',
    category: 'Luxury',
    location: 'Nairobi',
    image: RangeRover,
    description: 'Luxury SUV with premium features.',
  },
  {
    id: 6,
    brand: 'Mercedes',
    model: 'C-Class',
    year: 2022,
    price: 4500000,
    mileage: 10000,
    fuelType: 'Gasoline',
    category: 'Luxury',
    location: 'Kisumu',
    image: Mercedes,
    description: 'Elegant luxury sedan.',
  },
  {
    id: 7,
    brand: 'Hyundai',
    model: 'Tucson',
    year: 2021,
    price: 3800000,
    mileage: 8000,
    fuelType: 'Gasoline',
    category: 'SUV',
    location: 'Nairobi',
    image: Hyundai,
    description: 'Compact SUV with modern design.',
  },
  {
    id: 8,
    brand: 'Nissan',
    model: 'Altima',
    year: 2020,
    price: 1600000,
    mileage: 16000,
    fuelType: 'Gasoline',
    category: 'Sedan',
    location: 'Eldoret',
    image: Nissan,
    description: 'Comfortable and reliable sedan.',
  },
];

export const fetchCars = createAsyncThunk('cars/fetchCars', async () => {
  // Simulate API call with error handling
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // You can filter mockCars here if needed
        resolve(mockCars);
      } catch (error) {
        reject(new Error('Failed to fetch cars: ' + error.message));
      }
    }, 1000);
  });
});

export const fetchCarById = createAsyncThunk('cars/fetchCarById', async (carId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (!carId) {
          reject(new Error('Car ID is required'));
          return;
        }
        const car = mockCars.find(c => c.id === parseInt(carId));
        if (car) {
          resolve(car);
        } else {
          reject(new Error('Car not found'));
        }
      } catch (error) {
        reject(new Error('Failed to fetch car: ' + error.message));
      }
    }, 500);
  });
});

export const searchCarsAsync = createAsyncThunk('cars/searchCarsAsync', async (searchTerm) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        if (!searchTerm || typeof searchTerm !== 'string') {
          resolve(mockCars); // If no search term, return all cars
          return;
        }
        const filteredCars = mockCars.filter(car =>
          car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        resolve(filteredCars);
      } catch (error) {
        reject(new Error('Search failed: ' + error.message));
      }
    }, 300);
  });
});

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    items: [],
    loading: false,
    error: null,
    filters: { priceRange: [0, 20000000], brands: [], categories: [], years: [], searchTerm: '', location: '' },
    sortBy: 'relevance',
    currentPage: 1,
    totalPages: 1,
  },
  reducers: {
    applyFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1; // Reset to first page when filtering
    },
    sortCars: (state, action) => {
      state.sortBy = action.payload;
    },
    searchCars: (state, action) => {
      state.filters.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cars
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.totalPages = Math.ceil(action.payload.length / 10);
        state.error = null;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.items = []; // Clear items on error
      })
      // Fetch Car by ID
      .addCase(fetchCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.loading = false;
        // Add the fetched car to the items array if it's not already there
        const car = action.payload;
        const existingIndex = state.items.findIndex(item => item.id === car.id);
        if (existingIndex === -1) {
          state.items.push(car);
        } else {
          // Update existing car data
          state.items[existingIndex] = car;
        }
        state.error = null;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Search Cars
      .addCase(searchCarsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCarsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.totalPages = Math.ceil(action.payload.length / 10);
        state.error = null;
      })
      .addCase(searchCarsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.items = []; // Clear items on search error
      });
  },
});

export const { applyFilters, sortCars, searchCars, setCurrentPage } = carsSlice.actions;
export default carsSlice.reducer;