import axios from 'axios';


export const getPosts = async () => {
    try {
        const API_BASE_URL = 'http://localhost:8080';
        const AUTH_TOKEN = sessionStorage.getItem('token');

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


