import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import initialValue from "./initialValue";
import builders from "../builder";
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/';

export const userProfile = createAsyncThunk(
    "profile/userProfile",
    async ({id,user}, {rejectWithValue}) => {
        const TOKEN = localStorage.getItem("token") || sessionStorage.getItem("token");
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
        const TOKEN = localStorage.getItem("token") || sessionStorage.getItem("token");
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

export const getUserPosts = createAsyncThunk(
    "profile/getUserPosts",
    async ({page = 0, size = 2, userId}, {rejectWithValue}) => {
        const TOKEN = localStorage.getItem("token") || sessionStorage.getItem("token");
        const params = new URLSearchParams({ page, size });
        try {
            const response = await axios.get(`${BASE_URL}api/v1/posts/get/${userId}?${params}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            console.log("USERPROFILEPOSTS THUNK: ",response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getUserPostsContent = createAsyncThunk(
    "profile/getUserPostsContent",
    async ({page = 0, size = 2, userId}, {rejectWithValue}) => {
        const TOKEN = localStorage.getItem("token") || sessionStorage.getItem("token");
        const params = new URLSearchParams({ page, size });
        try {
            const response = await axios.get(`${BASE_URL}api/v1/posts/get/${userId}?${params}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            console.log("USERPROFILEPOSTS THUNK: ",response);
            return response.data.content;
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
        builders(builder, userProfile, 'profileData');
        builders(builder, editUser, 'editUserData');
        builders(builder, getUserPosts, 'userPosts');
        // builders(builder, getUserPostsContent, 'userPostsContent');
        builder
            .addCase(getUserPostsContent.pending, (state) => {
                state.userPostsContent.status = 'loading';
            })
            .addCase(getUserPostsContent.fulfilled, (state, action) => {
                state.userPostsContent.status = 'succeeded';
                // Додавання нових постів до наявних
                state.userPostsContent.obj = [...state.userPostsContent.obj, ...action.payload];
            })
            .addCase(getUserPostsContent.rejected, (state, action) => {
                state.userPostsContent.status = 'failed';
                state.userPostsContent.error = action.error.message;
            });
    }
});

export const {modalEditProfile, resetEditProfileState} = profileSlice.actions;
export default profileSlice.reducer;