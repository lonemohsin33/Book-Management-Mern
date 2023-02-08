import {createReducer} from '@reduxjs/toolkit'

const bookReducer = createReducer(
  {},
  {
    bookRequest: state => {
      state.loading = true;
    },
    bookSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    bookFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    bookUpRequest: state => {
      state.loading = true;
    },
    bookUpSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    bookUpFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
);
export default bookReducer