import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      // You might want to decode the JWT here to get user info
      
      state.user = action.payload.user;

    },
    logout: (state) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
    register: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      // You might want to decode the JWT here to get user info
      state.user = action.payload.user;
    },
  },
});

export const { login, logout, register } = authSlice.actions;

export default authSlice.reducer;