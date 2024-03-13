import { configureStore } from '@reduxjs/toolkit';
import submenuReducer from '../slices/submenuSlice';
import sidebarReducer from '../slices/sidebarSlice';

const store = configureStore({
  reducer: {
    submenu: submenuReducer,
    sidebar: sidebarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
