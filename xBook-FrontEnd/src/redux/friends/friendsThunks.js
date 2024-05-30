import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'http://localhost:8080/';

export const getFriends = createAsyncThunk(
    "friends/getFriends",
    async ({ page = 0, size = 2, userId,}, { rejectWithValue }) => {
        const TOKEN = localStorage.getItem("token") || sessionStorage.getItem("token");
        const params = new URLSearchParams({ page, size });
        try {
            const response = await axios.get(`${BASE_URL}api/v1/friends/${userId}?${params}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            console.log("GET FRIENDS THUNK: ",response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const deleteFriend = createAsyncThunk(
    "friends/deleteFriend",
    async ({ friendId}, { rejectWithValue }) => {
        const TOKEN = localStorage.getItem("token") || sessionStorage.getItem("token");
        try {
            const response = await axios.delete(`${BASE_URL}api/v1/friends/delete-friend/${friendId}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            console.log("DELETE FRIEND THUNK: ",response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const sendFriendRequest = createAsyncThunk(
    "friends/sendFriendRequest",
    async ({friendId}, { rejectWithValue }) => {
        const TOKEN = localStorage.getItem("token") || sessionStorage.getItem("token");
        try {
            const response = await axios.post(`${BASE_URL}api/v1/friends/add-friend/${friendId}`, {friendId}, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            console.log("SEND REQUEST THUNK: ",response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const acceptFriendRequest = createAsyncThunk(
    "friends/acceptFriendRequest",
    async ({userId, friendId}, { rejectWithValue }) => {
        const TOKEN = localStorage.getItem("token") || sessionStorage.getItem("token");
        try {
            const response = await axios.post(`${BASE_URL}api/v1/friends/accept-friend/${friendId}`, {userId, friendId}, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            console.log("ACCEPT REQUEST THUNK: ",response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const rejectFriendRequest = createAsyncThunk(
    "friends/rejectFriendRequest",
    async ({ friendId}, { rejectWithValue }) => {
        const TOKEN = localStorage.getItem("token") || sessionStorage.getItem("token");
        try {
            const response = await axios.delete(`${BASE_URL}api/v1/friends/reject-friend/${friendId}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                }
            });
            console.log("REJECT REQUEST THUNK: ",response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const friendData = createAsyncThunk(
    'friends/friend',
    async ({ id }, { rejectWithValue }) => {
        const TOKEN = localStorage.getItem("token") || sessionStorage.getItem("token");
        try {
            const response = await axios.get(`${BASE_URL}api/v1/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            console.log("FRIEND DATA THUNK: ",response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const requests = createAsyncThunk(
    'friends/requests',
    async ({ page = 0, size = 2}, { rejectWithValue }) => {
        const TOKEN = localStorage.getItem("token") || sessionStorage.getItem("token");
        const params = new URLSearchParams({ page, size });
        try {
            const response = await axios.get(`${BASE_URL}api/v1/friends/requests?${params}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            console.log("ALL REQUEST THUNK: ",response);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
