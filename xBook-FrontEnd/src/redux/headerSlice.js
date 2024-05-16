
import { createSlice } from '@reduxjs/toolkit';

export const headerSlice = createSlice({
  name: 'header',
  initialState: {
    anchorElNav: null,
    anchorElUser: null,
    searchQuery: '',
  },
  reducers: {
    setAnchorElNav: (state, action) => {
      state.anchorElNav = action.payload;
    },
    setAnchorElUser: (state, action) => {
      state.anchorElUser = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearHeaderState: (state) => {
      state.anchorElNav = null;
      state.anchorElUser = null;
      state.searchQuery = '';
    },
  },
});

export const { setAnchorElNav, setAnchorElUser, setSearchQuery, clearHeaderState } = headerSlice.actions;

export default headerSlice.reducer;
