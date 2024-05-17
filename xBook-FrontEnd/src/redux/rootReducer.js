import { combineReducers } from 'redux';

import authSlice from './authSlice';
import headerSlice from './headerSlice';

const rootReducer = combineReducers({
    auth: authSlice,
    header:headerSlice
});

export default rootReducer;