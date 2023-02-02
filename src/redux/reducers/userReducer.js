import { createReducer } from '@reduxjs/toolkit';

const userReducer = createReducer(
  {},
  {
    loginRequest: state => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      // state.user = action.payload.user;
      state.message = action.payload;
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;

      state.error = action.payload;
      // state.message = action.payload.response.data.msg;
    },
    signupRequest: state => {
      state.loading = true;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      // state.isAuthenticated = true;
      // state.user = action.payload.user;
      state.message = action.payload;
    },
    signupFail: (state, action) => {
      state.loading = false;
      // state.isAuthenticated = false;

      state.error = action.payload;
      // state.message= action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    clearMessage: state => {
      state.message = null;
    },
  }
);
export default userReducer
