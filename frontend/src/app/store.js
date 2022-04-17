import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../features/appSlice';
import serverReducer from '../features/serverSlice';
import authReducer  from '../features/authSlice';
import messageReducer from '../features/messageSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    server: serverReducer,
    auth: authReducer,
    message: messageReducer
  },
});
