import { useState, useEffect } from 'react';
import Post from '../Post/Post';
import { Grid, Typography } from '@mui/material/';

export default function PostsFeed(){

    const [postData, setPostData] = useState([]);

    useEffect(() => {
        fetch('../testPostData.json')
        .then(response => response.json())
        .then(data => {
            setPostData(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    return(
        <Grid container spacing={3}>
            {postData.map(post => (
                <Grid item xs={12} key={post.id}>
                    <Post postData={post} />
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