import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import initialValue from "./initialValue";
import axios from 'axios';

const TOKEN = localStorage.getItem('token');
const BASE_URL = 'http://localhost:8080/';

export const userProfile = createAsyncThunk(
    "profile/userProfile",
    async ({id,user}, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${BASE_URL}api/v1/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            console.log("USERPROFILE THUNK: ",response);
            return {...response.data, user:user};
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const editUser = createAsyncThunk(
    "profile/editUser",
    async ({ id, userObj}, { rejectWithValue }) => {
        try {
            const response = await axios.patch(`${BASE_URL}api/v1/users/${id}`, userObj, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const profileSlice = createSlice({
    name: "profile",
    initialState: initialValue,
    reducers: {
        modalEditProfile: (state, action) => {
            state.modalEditProfile.state = action.payload;
        },
        resetEditProfileState: (state) =>{
            state.editUserData = initialValue.editUserData;
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(userProfile.pending, state => {
                state.profileData.status = "pending"
                state.profileData.error = null;
            })
            .addCase(userProfile.fulfilled, (state, action) => {
                state.profileData.status = "fullfield";
                state.profileData.obj = action.payload;
                state.profileData.error = null;
            })
            .addCase(userProfile.rejected, (state, action) => {
                state.profileData.status = "rejected"
                state.profileData.error = action.payload;
            })
        builder
            .addCase(editUser.pending, state => {
                state.editUserData.status = "pending"
                state.editUserData.error = null;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.editUserData.status = "fullfield";
                state.editUserData.obj = action.payload;
                state.editUserData.error = null;
            })
            .addCase(editUser.rejected, (state, action) => {
                state.editUserData.status = "rejected"
                state.editUserData.error = action.payload;
            })
    }
});

export const {modalEditProfile, resetEditProfileState} = profileSlice.actions;
export default profileSlice.reducer;