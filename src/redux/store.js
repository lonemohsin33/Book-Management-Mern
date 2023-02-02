import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './reducers/bookReducer';
import  userReducer  from './reducers/userReducer';


const store = configureStore({
    reducer: {
        user: userReducer,
        book: bookReducer
        
        
    }
});
export default store
export const server = 'http://localhost:4000'