import { configureStore } from '@reduxjs/toolkit';

import { reducer as yourSliceReducer } from './slice';

const store = configureStore({
    reducer: {
        yourSlice: yourSliceReducer,
    },
});

export default store;