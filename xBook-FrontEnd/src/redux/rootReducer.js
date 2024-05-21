import { combineReducers } from 'redux';
import profileSlice from './profile/profileSlice';
import friendsSlice from './friends/friendsSlice';

const rootReducer = combineReducers({
    profile: profileSlice,
    friends: friendsSlice,
});

export default rootReducer;