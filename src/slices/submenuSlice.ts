import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';

interface submenuState {
  selectedIndex: number;
}

const initialState: submenuState = {
  selectedIndex: -1,
};

export const submenuSlice = createSlice({
  name: 'submenu',
  initialState,
  reducers: {
    showSubmenu: (state, action) => {
      state.selectedIndex = action.payload;
    },
    hideSubmenu: (state) => {
      state.selectedIndex = -1;
    },
  },
});

export const { showSubmenu, hideSubmenu } = submenuSlice.actions;

export const selectSubmenu = (state: RootState) => state.submenu.selectedIndex;

export default submenuSlice.reducer;
