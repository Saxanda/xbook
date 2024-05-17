import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tokenValue: "",
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {   
    setToken: (state, action) => { 
        state.tokenValue = action.payload;
      },
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;