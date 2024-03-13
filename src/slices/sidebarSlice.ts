import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';

interface SidebarState {
  value: boolean;
}

const initialState: SidebarState = {
  value: false,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    showSidebar: (state) => {
      state.value = true;
    },
    hideSidebar: (state) => {
      state.value = false;
    },
  },
});

export const { showSidebar, hideSidebar } = sidebarSlice.actions;

export const selectSidebar = (state: RootState) => state.sidebar.value;

export default sidebarSlice.reducer;
