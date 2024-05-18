import axios from 'axios';
import { jwtDecode } from "jwt-decode";


const API_BASE_URL = 'http://localhost:8080';
const AUTH_TOKEN = localStorage.getItem('token');
const UZER_ID = jwtDecode(AUTH_TOKEN).sub
console.log(UZER_ID);

//-------------post---------------------
export const getPosts = async () => {
    try {
        const AUTH_TOKEN = localStorage.getItem('token');
        const response = await axios.get(
            `${API_BASE_URL}/api/v1/posts`,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'accept': '*/*'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
export const getOnePost = async (postId) => {
    try {
        const AUTH_TOKEN = localStorage.getItem('token');
        const response = await axios.get(
            `${API_BASE_URL}/api/v1/posts/fetch/${postId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'accept': '*/*'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching the post:', error);
        throw error;
    }
};
export const createPost = async (postData) => {
    try {
        const AUTH_TOKEN = localStorage.getItem('token');
        const response = await axios.post(
            `${API_BASE_URL}/api/v1/posts/post`,
            postData,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'accept': '*/*'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating post:', error);
        throw error;
    }
};
//------------like----------------------
export const likePost = async (postId) => {
    try {
        const API_BASE_URL = 'http://localhost:8080';
        const AUTH_TOKEN = localStorage.getItem('token');
        console.log(AUTH_TOKEN);
        const response = await axios.post(
            `${API_BASE_URL}/api/v1/likes/like`,
            { UZER_ID, postId },  // Передаємо userId і postId у запиті
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'accept': '*/*'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error liking the post:', error);
        throw error;
    }
};
//-------------coment---------------------
export const getPostComments = async (postId) => {
    try {
        const AUTH_TOKEN = localStorage.getItem('token');
        const response = await axios.get(
            `${API_BASE_URL}/api/v1/comments/post/${postId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'accept': '*/*'
                }
            }
        );
        return response.data || [];
    } catch (error) {
        console.error('Error fetching post comments:', error);
        return [];
    }
};
export const createComment = async (content, postId) => {
    try {
        const AUTH_TOKEN = localStorage.getItem('token');
        const userId = UZER_ID;
        const response = await axios.post(
            `${API_BASE_URL}/api/v1/comments/comment`,
            { content,userId, postId },
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'accept': '*/*'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
};
export const getUserById = async (uzerId) => {
    try {
        const AUTH_TOKEN = localStorage.getItem('token');
        const response = await axios.get(
            `${API_BASE_URL}/api/v1/users/${uzerId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'accept': '*/*'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};


