import { useState, useEffect } from 'react';
import Post from '../Post/Post';
import { Grid, Typography } from '@mui/material/';
import { getPosts } from '../Post/postApi';
import PropTypes from 'prop-types';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export default function PostsFeed({refresh,handlePostCreated }){
    const [postData, setPostData] = useState([]);

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userIdFromToken = decodedToken.sub || decodedToken.id;
            setUserId(userIdFromToken);
        }
    }, [])



    useEffect(() => {
        const fetchData = async () => {
        try {
            const data = await getPosts();
            setPostData(data.content);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
        };


        fetchData();
    },[refresh]);

    const getAuthToken = () => {
        return sessionStorage.getItem('token') || localStorage.getItem('token');
    };

    const addToBookmarks = async (postId) => {
        try {
            const token = getAuthToken();
            const response = await axios.post(`http://localhost:8080/api/v1/bookmarks`, {
                postId: postId, userId
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Post added to bookmarks:', response.data);
        } catch (error) {
            console.error('Error adding post to bookmarks:', error);
        }
    };

    

    return(
        <Grid container spacing={3}>
            {postData.map(post => (
                <Grid item xs={12} key={post.id}>
                    <Post postData={post} refresh={handlePostCreated} addToBookmarks={addToBookmarks} />
                </Grid>
            ))}
            {postData.length === 0 && (
                <Grid item xs={12}>
                    <Typography variant="body1">No posts to display.</Typography>
                </Grid>
            )}
        </Grid>
    )
}

PostsFeed.propTypes = {
    refresh: PropTypes.bool.isRequired,
    handlePostCreated: PropTypes.func
};