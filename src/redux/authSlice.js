import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: true,
  token: null,
  user: "hari",
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      // You might want to decode the JWT here to get user info

    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
    register: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      // You might want to decode the JWT here to get user info

    },
  },
});

export const { login, logout, register } = authSlice.actions;

export default authSlice.reducer;