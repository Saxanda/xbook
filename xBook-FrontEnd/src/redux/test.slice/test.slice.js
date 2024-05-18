import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: false,
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {   
    toggleStatus: (state) => {
      state.status = !state.status;
    },
  },
});

export const { toggleStatus } = testSlice.actions;
export default testSlice.reducer;