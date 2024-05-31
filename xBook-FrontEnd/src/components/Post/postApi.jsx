import axios from 'axios';
import { jwtDecode } from "jwt-decode";


const API_BASE_URL = 'http://localhost:8080';
const getToken = () => {
    let token = sessionStorage.getItem('token');
    if (!token) {
        token = localStorage.getItem('token');
    }
    return token;
};


//-------------post---------------------
export const getPosts = async (page) => {
    try {
        const AUTH_TOKEN = getToken();
        const response = await axios.get(
            `${API_BASE_URL}/api/v1/posts?page=${page}&size=5&sortBy=createdDate&sortDir=desc`,
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${AUTH_TOKEN}`,
                    'accept': '*/*'
                }
            }
        );
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
export const getOnePost = async (postId) => {
    try {
        const AUTH_TOKEN = getToken();
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
export const createPost = async (postData, originalPost) => {
    try {
        const AUTH_TOKEN = getToken();
        let url = `${API_BASE_URL}/api/v1/posts/post`;

        if (originalPost) {
            url += `?originalPostId=${originalPost}`;
        }

        const response = await axios.post(
            url,
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
export const deletePost = async(postId)=>{
    try {
        const AUTH_TOKEN = getToken();
        const response = await axios.delete(
            `${API_BASE_URL}/api/v1/posts/delete/${postId}`,
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
        console.error('Error deleting the post:', error);
        throw error;
    }

}
//------------like----------------------
export const likePost = async (postId) => {
    try {
        const AUTH_TOKEN = getToken();
        const response = await axios.post(
            `${API_BASE_URL}/api/v1/likes/like`,
            {postId },
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
export const deleteLike = async(postId) =>{
    try {
        const AUTH_TOKEN = getToken();
        console.log('Deleting like for postId:', postId);
        const response = await axios.delete(
            `${API_BASE_URL}/api/v1/likes/delete/${postId}`,
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
}
//-------------coment---------------------
export const getPostComments = async (postId) => {
    try {
        const AUTH_TOKEN = getToken();
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
        const AUTH_TOKEN = getToken();
        const UZER_ID = jwtDecode(AUTH_TOKEN).sub
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
        const AUTH_TOKEN = getToken();
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
//----------------user----------------
export const getUserIsLogin = async () => {
    try {
        const AUTH_TOKEN = getToken();
        if (!AUTH_TOKEN) {
            throw new Error('No authentication token found');
        }

        const UZER_ID = jwtDecode(AUTH_TOKEN).sub;
        const userId = UZER_ID;

        const response = await axios.get(
            `${API_BASE_URL}/api/v1/users/${userId}`,
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
        console.error('Error fetching user login status:', error);
        throw error;
    }
}
//--------------friend----------------
export const getFriends = async () => {
    try {
        const AUTH_TOKEN = getToken();
        const USER_ID = jwtDecode(AUTH_TOKEN).sub;

        const response = await axios.get(
            `${API_BASE_URL}/api/v1/friends/${USER_ID}?size=5`,
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
        console.error('Error fetching friends:', error);
        throw error;
    }
}

