
import { Grid } from '@mui/material';
import PostsFeed from '../Post/PostsFeed';
import CreatePost from '../Post/CreatePost';


export default function Home() {

    return (
        <section  className='home_posts_container'>
            <Grid item xs={12} sm={8} md={6} className='create_post'>
                <CreatePost></CreatePost>
            </Grid>
            <Grid item xs={12} sm={8} md={6}>
                <PostsFeed></PostsFeed>
            </Grid>
        </section>
    );
}