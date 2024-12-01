import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userServices';

const initialState = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Async thunk for registering a user
export const signupUser = createAsyncThunk(
  'user/signupUser',
  async (userData, thunkAPI) => {
    try {
      const response = await userService.registerUser(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'An error occurred during signup'
      );
    }
  }
);

// Async thunk for logging in a user (example)
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData, thunkAPI) => {
    try {
      const response = await userService.loginUser(userData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'An error occurred during login'
      );
    }
  }
);

// Async thunk for fetching the user profile (example)
export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, thunkAPI) => {
    try {
      const response = await userService.getProfile();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'An error occurred while fetching profile'
      );
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem('token', action.payload.token); // Save token to localStorage
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        localStorage.setItem('token', action.payload.token); // Save token to localStorage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, logout } = userSlice.actions;
export default userSlice.reducer;
