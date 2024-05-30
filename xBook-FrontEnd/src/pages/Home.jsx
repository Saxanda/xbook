import { useState } from 'react';
import { Grid } from '@mui/material';
import PostsFeed from '../components/Post/PostsFeed'
import CreatePost from '../components/Post/CreatePost';
import ComunitiSideBar from '../components/UpdateNavigations/ComunitiSideBar';
import NavigationSideBar from '../components/UpdateNavigations/NavigationSideBar';


export default function Home() {
    const [refresh, setRefresh] = useState(false);

    const handlePostCreated = () => {
        setRefresh(prev => !prev); 
    };
    return (
        <div className="home_container">
        <NavigationSideBar></NavigationSideBar>
        <section  className='home_posts_container'>
            <Grid item xs={12} sm={8} md={6} className='create_post'>
                <CreatePost onPostCreated={handlePostCreated} ></CreatePost>
            </Grid>
            <Grid item xs={12} sm={8} md={6}>
                <PostsFeed refresh={refresh} handlePostCreated={handlePostCreated} ></PostsFeed>
            </Grid>
        </section>
        <ComunitiSideBar></ComunitiSideBar>
        </div>
    );
}