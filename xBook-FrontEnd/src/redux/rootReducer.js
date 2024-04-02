import { combineReducers } from 'redux';
import { reducer as yourSliceReducer } from './yourSlice';

const rootReducer = combineReducers({
    yourSlice: yourSliceReducer,
});

export default rootReducer;