import { createSlice } from '@reduxjs/toolkit';

const storedAuthData = JSON.parse(localStorage.getItem('authData'));

const authSlice = createSlice({
  name: 'auth',
  initialState: storedAuthData || { email: '', rememberMe: false },
  reducers: {
    setAuthData(state, action) {
      const { email, rememberMe } = action.payload;
      localStorage.setItem('authData', JSON.stringify({ email, rememberMe }));
      return { email, rememberMe };
    },
    clearAuthData(state) {
      localStorage.removeItem('authData');
      return { email: '', rememberMe: false };
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;