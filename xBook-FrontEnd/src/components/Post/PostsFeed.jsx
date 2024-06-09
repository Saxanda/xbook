import { useState, useEffect, useRef } from 'react';
import Post from '../Post/Post';
import { Grid, Typography, CircularProgress } from '@mui/material/';
import { getPosts } from '../Post/postApi';
import PropTypes from 'prop-types';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import API_BASE_URL from '../../helpers/apiConfig';

export default function PostsFeed({ refresh, handlePostCreated, }) {
    const [postData, setPostData] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const observer = useRef();
    const lastPostElementRef = useRef();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userIdFromToken = decodedToken.sub || decodedToken.id;
            setUserId(userIdFromToken);
        }
    }, []);

    const fetchPosts = async (page, reset = false) => {
        setLoading(true);
        try {
            const data = await getPosts(page);
            if (reset) {
                setPostData(data.content);
                setPage(0);
            } else {
                setPostData(prevPosts => [...prevPosts, ...data.content]);
            }
            setHasMore(!data.last);
            console.log("current page: " + page);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(0, true);
    }, [refresh]);

    useEffect(() => {
        if (page > 0) fetchPosts(page);
    }, [page]);

    useEffect(() => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (lastPostElementRef.current) {
            observer.current.observe(lastPostElementRef.current);
        }
    }, [loading, hasMore]);

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
        <Grid container spacing={3} >
            {postData.map((post, index) => (
                <Grid item xs={12} key={post.id} ref={postData.length === index + 1 ? lastPostElementRef : null}>
                    <Post postData={post} refresh={handlePostCreated} addToBookmarks={addToBookmarks} removeFromBookmarks={removeFromBookmarks} />
                </Grid>
            ))}
            {loading && (
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <CircularProgress />
                </Grid>
            )}
            {!loading && postData.length === 0 && (
                <Grid item xs={12}>
                    <Typography variant="body1">No posts to display.</Typography>
                </Grid>
            )}
        </Grid>
    )
}

PostsFeed.propTypes = {
    refresh: PropTypes.bool.isRequired,
    handlePostCreated: PropTypes.func,
    bookmarkId:PropTypes.string,
};
