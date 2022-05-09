import { configureStore } from '@reduxjs/toolkit';
import channelReducer from '../features/channelSlice';
import serverReducer from '../features/serverSlice';
import authReducer  from '../features/authSlice';
import messageReducer from '../features/messageSlice';
import infoServerReducer from '../features/infoServerSlice'
import infoChannelReducer from '../features/infoChannelSlice';

export const store = configureStore({
  reducer: {
    infoServer: infoServerReducer, 
    infoChannel: infoChannelReducer,
    channel: channelReducer,
    server: serverReducer,
    auth: authReducer,
    message: messageReducer
  },
});
