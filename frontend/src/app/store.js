import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import appReducer from '../features/appSlice';
import serverReducer from '../features/serverSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    server: serverReducer,
  },
});
