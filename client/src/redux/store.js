import { configureStore } from '@reduxjs/toolkit';
import { alertSlice } from './features/alertSlice';
import userReducer from './features/userSlice';



const store = configureStore({
    reducer: {
        alerts: alertSlice.reducer, 
        user: userReducer,
    },
});

export default store;
