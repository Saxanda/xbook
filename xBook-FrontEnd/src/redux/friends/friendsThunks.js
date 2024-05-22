import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'http://localhost:8080/';
const TOKEN = localStorage.getItem('token');

export const getFriends = createAsyncThunk(
    "friends/getFriends",
    async ({ page = 0, size = 2, userId,}, { rejectWithValue }) => {
        const params = new URLSearchParams({ page, size });
        try {
            const response = await axios.get(`${BASE_URL}api/v1/friends/${userId}?${params}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const deleteFriend = createAsyncThunk(
    "friends/deleteFriend",
    async ({ friendId}, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL}api/v1/friends/delete-friend/${friendId}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const sendFriendRequest = createAsyncThunk(
    "friends/sendFriendRequest",
    async ({friendId}, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}api/v1/friends/add-friend/${friendId}`, {friendId}, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const acceptFriendRequest = createAsyncThunk(
    "friends/acceptFriendRequest",
    async ({userId, friendId}, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}api/v1/friends/accept-friend/${friendId}`, {userId, friendId}, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const rejectFriendRequest = createAsyncThunk(
    "friends/rejectFriendRequest",
    async ({ friendId}, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`${BASE_URL}api/v1/friends/reject-friend/${friendId}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const friendData = createAsyncThunk(
    'friends/friend',
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}api/v1/users/${id}`, {
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

export const requests = createAsyncThunk(
    'friends/requests',
    async ({ page = 0, size = 2}, { rejectWithValue }) => {
        const params = new URLSearchParams({ page, size });
        try {
            const response = await axios.get(`${BASE_URL}api/v1/friends/requests?${params}`, {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)
