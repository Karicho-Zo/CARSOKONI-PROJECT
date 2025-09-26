import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk('user/loginUser', async (credentials) => {
  // Mock login with better error handling
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Validate input
        if (!credentials.email || !credentials.password) {
          reject(new Error('Email and password are required'));
          return;
        }

        // Check credentials (case-insensitive email)
        if (credentials.email.toLowerCase() === 'test@test.com' && credentials.password === 'password') {
          const userData = {
            id: 1,
            name: 'Test User',
            email: 'test@test.com',
            avatar: 'https://via.placeholder.com/100x100?text=User'
          };
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      } catch (error) {
        reject(new Error('Login failed: ' + error.message));
      }
    }, 1000);
  });
});

export const registerUser = createAsyncThunk('user/registerUser', async (userData) => {
  // Mock register
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: Date.now(), ...userData, avatar: 'https://via.placeholder.com/100x100?text=User' });
    }, 1000);
  });
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    userInfo: null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userInfo = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;