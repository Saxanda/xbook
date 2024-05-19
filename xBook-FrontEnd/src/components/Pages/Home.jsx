import { useState } from 'react';
import { Grid } from '@mui/material';
import PostsFeed from '../Post/PostsFeed';
import CreatePost from '../Post/CreatePost';


export default function Home() {
    const [refresh, setRefresh] = useState(false);

    const handlePostCreated = () => {
        setRefresh(prev => !prev); 
    };
    return (
        <section  className='home_posts_container'>
            <Grid item xs={12} sm={8} md={6} className='create_post'>
                <CreatePost onPostCreated={handlePostCreated} ></CreatePost>
            </Grid>
            <Grid item xs={12} sm={8} md={6}>
                <PostsFeed refresh={refresh} handlePostCreated={handlePostCreated} ></PostsFeed>
            </Grid>
        </section>
    );
}

