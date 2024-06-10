import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import initialValue from "./initialValue";
import builders from "../builder";
import axios from 'axios';
import API_BASE_URL from "../../helpers/apiConfig";

const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");

export const userProfile = createAsyncThunk(
    "profile/userProfile",
    async ({id, user}, {rejectWithValue}) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/v1/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            return {...response.data, user: user};
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const editUser = createAsyncThunk(
    "profile/editUser",
    async ({id, userObj}, {rejectWithValue}) => {
        try {
            const response = await axios.patch(`${API_BASE_URL}/api/v1/users/${id}`, userObj, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getUserPosts = createAsyncThunk(
    "profile/getUserPosts",
    async ({page = 0, size = 5, userId}, {rejectWithValue}) => {
        const params = new URLSearchParams({page, size});
        try {
            const response = await axios.get(`${API_BASE_URL}/api/v1/posts/get/${userId}?${params}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
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
        resetEditProfileState: (state) => {
            state.editUserData = initialValue.editUserData;
        }
    },
    extraReducers: (builder) => {
        builders(builder, userProfile, 'profileData');
        builders(builder, editUser, 'editUserData');
        builders(builder, getUserPosts, 'userPosts');
    }
});

export const {modalEditProfile, resetEditProfileState} = profileSlice.actions;
export default profileSlice.reducer;
