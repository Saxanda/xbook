import { combineReducers } from 'redux';

import authSlice from './authSlice';
import headerSlice from './headerSlice';
import profileSlice from './profile/profileSlice';
import friendsSlice from './friends/friendsSlice';

const rootReducer = combineReducers({
    auth: authSlice,
    header:headerSlice,
    profile: profileSlice,
    friends: friendsSlice,
});

export default rootReducer;