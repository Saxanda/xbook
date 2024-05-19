import { useState, useEffect } from 'react';
import Post from '../Post/Post';
import { Grid, Typography } from '@mui/material/';
import { getPosts } from '../Post/postApi';
import PropTypes from 'prop-types';

export default function PostsFeed({refresh,handlePostCreated}){
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const data = await getPosts();
            setPostData(data.content);
            console.log(data.content);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
        };

        fetchData();
    },[refresh]);
    return(
        <Grid container spacing={3}>
            {postData.map(post => (
                <Grid item xs={12} key={post.id}>
                    <Post postData={post} refresh={handlePostCreated} />
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