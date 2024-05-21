import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

// import { reducer as yourSliceReducer } from './slice';

const store = configureStore({
    reducer: {
        reducer: rootReducer,
    },
});

export default store;