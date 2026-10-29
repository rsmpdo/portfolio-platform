import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../services/api';

const tokenFromStorage = localStorage.getItem('portfolio_jwt_token');

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await API.post('/auth/login', credentials);
      if (!res.data.requiresTwoFactor && res.data.token) {
        localStorage.setItem('portfolio_jwt_token', res.data.token);
      }
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const verifyTwoFactorLogin = createAsyncThunk(
  'auth/verifyTwoFactorLogin',
  async ({ tempToken, code }, { rejectWithValue }) => {
    try {
      const res = await API.post('/auth/2fa/login-verify', { tempToken, code });
      if (res.data.token) {
        localStorage.setItem('portfolio_jwt_token', res.data.token);
      }
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Invalid Authenticator code');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await API.post('/auth/register', userData);
      localStorage.setItem('portfolio_jwt_token', res.data.token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get('/auth/me');
      return res.data;
    } catch (err) {
      localStorage.removeItem('portfolio_jwt_token');
      return rejectWithValue(err.response?.data?.message || 'Session expired');
    }
  }
);

export const elevateToAdmin = createAsyncThunk(
  'auth/elevateToAdmin',
  async (adminSecretCode, { rejectWithValue }) => {
    try {
      const res = await API.post('/auth/elevate-admin', { adminSecretCode });
      localStorage.setItem('portfolio_jwt_token', res.data.token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Elevation failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: tokenFromStorage || null,
    isAuthenticated: !!tokenFromStorage,
    requiresTwoFactor: false,
    twoFactorTempToken: null,
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('portfolio_jwt_token');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.requiresTwoFactor = false;
      state.twoFactorTempToken = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    cancelTwoFactor: (state) => {
      state.requiresTwoFactor = false;
      state.twoFactorTempToken = null;
      state.error = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.requiresTwoFactor) {
          state.requiresTwoFactor = true;
          state.twoFactorTempToken = action.payload.tempToken;
          state.isAuthenticated = false;
        } else {
          state.requiresTwoFactor = false;
          state.twoFactorTempToken = null;
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Verify 2FA Login
      .addCase(verifyTwoFactorLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyTwoFactorLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.requiresTwoFactor = false;
        state.twoFactorTempToken = null;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(verifyTwoFactorLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch current user
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      })
      // Elevate to Admin
      .addCase(elevateToAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(elevateToAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(elevateToAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, clearError, cancelTwoFactor, setUser } = authSlice.actions;
export default authSlice.reducer;
