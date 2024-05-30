import './ProfilePostsList.scss'
import { useSelector } from 'react-redux'
import { Typography, Box } from '@mui/material'
import ProfilePost from '../ProfilePost/ProfilePost'

export default function ProfilePostsLists() {

    const posts = useSelector(state => state.profile.userPosts.obj.content)
    console.log(posts);   
    
    return(
        <>
            {posts && posts.length !== 0 ? 
                <ul className='postsList'>
                    {posts.map(post => (
                        <li key={post.id}>
                            <ProfilePost post={post} />
                        </li>
                    ))}
                </ul>
                :
                <Typography variant='h5' sx={{my: "100px", alignSelf: "center"}}>
                    <Box sx={{color: "text.secondary", textTransform: "uppercase"}}>NO POSTS</Box>
                </Typography>
            }
        </>
    )
}