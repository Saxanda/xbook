import { createSlice } from "@reduxjs/toolkit";
import initialValue from './initialValue'
import builders from "../builder";
import { getFriends, deleteFriend, sendFriendRequest, acceptFriendRequest, rejectFriendRequest, friendData, requests} from "./friendsThunks";

const friendsSlice = createSlice({
    name: "friends",
    initialState: initialValue,
    reducers: {
        modalDeleteFriend: (state, action) => {
            state.modalDeleteFriend = action.payload
        },
        modalDeleteFriendProfile: (state, action) => {
            state.modalDeleteFriendProf = action.payload
        }
    },
    extraReducers: (builder) => {
        builders(builder, getFriends,'getFriends');
        builders(builder, deleteFriend,'deleteFriend');
        builders(builder, sendFriendRequest,'requestToFriend');
        builders(builder, acceptFriendRequest,'confirmFriendRequest');
        builders(builder, friendData, "friend");
        builders(builder, requests, "requestsToMe");
        builders(builder, rejectFriendRequest, "rejectFriendRequest");
    }
});

export const {modalDeleteFriend, modalDeleteFriendProfile} = friendsSlice.actions;
export default friendsSlice.reducer;