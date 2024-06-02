import './ProfilePostsList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';
import ProfilePost from '../ProfilePost/ProfilePost';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getUserPosts } from '../../redux/profile/profileSlice';
import { getUserPostsContent } from '../../redux/profile/profileSlice';
import { useParams } from 'react-router-dom';

export default function ProfilePostsLists() {

    const dispatch = useDispatch();
    let urlID = useParams().id;
    urlID = parseInt(urlID);

    const [postsData, setPostsData] = useState([]);
    const [page, setPage] = useState(0);

    const posts = useSelector(state => state.profile.userPostsContent.obj);
    const totalPosts = useSelector(state => state.profile.userPosts.obj.totalElements);
    const totalPostsPages = useSelector(state => state.profile.userPosts.obj.totalPages);
    const pageNumber = useSelector(state => state.profile.userPosts.obj.pageable?.pageNumber);
    console.log("pageNumber : ", pageNumber);
    console.log("totalPosts : ",totalPosts);
    console.log("totalPostsPages : ",totalPostsPages);
    console.log("posts : ", posts);   
    
    const handlePagination = () => {
        if (posts.length <= totalPosts) {            
            dispatch(getUserPosts({ userId: urlID, page: pageNumber + 1 }));
            dispatch(getUserPostsContent({ userId: urlID, page: pageNumber + 1 }));
        }
    }

    return(
        <>
            {posts && totalPosts !== 0 ? 
                <InfiniteScroll
                dataLength={posts.length}
                next={handlePagination}
                hasMore={posts.length < totalPosts}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                }
                >
                    <ul className='postsList'>
                        {posts.map(post => (
                            <li key={post.id}>
                                <ProfilePost post={post} />
                            </li>
                        ))}
                    </ul>
                </InfiniteScroll>
                :
                <Typography variant='h5' sx={{my: "100px", alignSelf: "center"}}>
                    <Box sx={{color: "text.secondary", textTransform: "uppercase"}}>NO POSTS</Box>
                </Typography>
            }
        </>
    )
}
