import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_BASE_URL from "../../helpers/apiConfig";


const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");


export const getFriends = createAsyncThunk(
    "friends/getFriends",
    async ({ page = 0, size = 4, userId }, { rejectWithValue }) => {
        const params = new URLSearchParams({ page, size });
        try {
            const response = await axios.get(`${API_BASE_URL}/api/v1/friends/${userId}?${params}`, {
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

export const deleteFriend = createAsyncThunk(
    "friends/deleteFriend",
    async ({ friendId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/api/v1/friends/delete-friend/${friendId}`, {
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

export const sendFriendRequest = createAsyncThunk(
    "friends/sendFriendRequest",
    async ({ friendId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/friends/add-friend/${friendId}`, {friendId}, {
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

export const acceptFriendRequest = createAsyncThunk(
    "friends/acceptFriendRequest",
    async ({ userId, friendId }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/v1/friends/accept-friend/${friendId}`, {userId, friendId}, {
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

export const rejectFriendRequest = createAsyncThunk(
    "friends/rejectFriendRequest",
    async ({ friendId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/api/v1/friends/reject-friend/${friendId}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const friendData = createAsyncThunk(
    'friends/friend',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/v1/users/${id}`, {
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

export const requests = createAsyncThunk(
    'friends/requests',
    async ({ page = 0, size = 3 }, { rejectWithValue }) => {
        const params = new URLSearchParams({ page, size });
        try {
            const response = await axios.get(`${API_BASE_URL}/api/v1/friends/requests?${params}`, {
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
