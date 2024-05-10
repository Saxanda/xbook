import { configureStore } from '@reduxjs/toolkit';
import testReducer from './test.slice/test.slice';
import tokenSlice from './token.slice/token.slice';

const store = configureStore({
  reducer: {
    test: testReducer,
    token: tokenSlice,
  },
});

export default store;