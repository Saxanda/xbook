import './ProfilePostsList.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';
import ProfilePost from '../ProfilePost/ProfilePost';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import { getUserPosts } from '../../redux/profile/profileSlice';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../helpers/apiConfig';

export default function ProfilePostsLists({ refresh, handlePostCreated }) {

    const dispatch = useDispatch();
    let urlID = useParams().id;
    urlID = parseInt(urlID);

    const [postsData, setPostsData] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    // const totalPosts = useSelector(state => state.profile.userPosts.obj?.totalElements);

    const userId = useSelector(state => state.profile.profileData.obj.id)

    useEffect(() => {
        const fetchInitialPosts = async () => {
            try {
                const response = await dispatch(getUserPosts({ userId: urlID, page: 0 }));
                const data = response.payload;
                setPostsData(data.content);
                setPage(1);
                setHasMore(!data.last);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchInitialPosts();
    }, [urlID, refresh]);

    const handlePagination = async () => {
        if (!hasMore) return;
        try {
            const response = await dispatch(getUserPosts({ userId: urlID, page: page }));
            const data = response.payload;
            setPostsData(prevPosts => [...prevPosts, ...data.content]);
            setPage(prevPage => prevPage + 1);
            setHasMore(!data.last);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const getAuthToken = () => {
        return sessionStorage.getItem('token') || localStorage.getItem('token');
    };

    const addToBookmarks = async (postId) => {
        try {
            const token = getAuthToken();
            const response = await axios.post(`${API_BASE_URL}/api/v1/bookmarks`, {
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

    const removeFromBookmarks = async (postId) => {
        try {
            const token = getAuthToken();
            const { data: bookmarksData } = await axios.get(`${API_BASE_URL}/api/v1/bookmarks/post/${postId}`, {
                           headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const bookmarkData = bookmarksData.content[0];

            const response = await axios.delete(`${API_BASE_URL}/api/v1/bookmarks/${bookmarkData.postId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Post removed from bookmarks:', response.data);
        } catch (error) {
            console.error('Error deleting a post from bookmarks:', error);
        }
    };

    return (
        <>
            {postsData.length > 0 ? 
                <InfiniteScroll
                    style={{marginTop: "20px"}}
                    dataLength={postsData.length}
                    next={handlePagination}
                    hasMore={hasMore}
                    loader={
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 0 10px 0"}}>
                            <CircularProgress />
                        </div>
                    }
                    // scrollableTarget='scrollableProfilePosts'
                >
                    <ul className='postsList'>
                        {postsData.map(post => (
                            <li key={post.id}>
                                <ProfilePost post={post} refresh={handlePostCreated} addToBookmarks={addToBookmarks} removeFromBookmarks={removeFromBookmarks} />
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
    );
}