import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: [],
};

const yourSlice = createSlice({
    name: 'yourSliceName',
    initialState,
    reducers: {
    setData: (state, action) => {
        state.data = action.payload;
    },
    },
});

export const { actions, reducer } = yourSlice;