// import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Post from "./Post";
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import PostComments from './PostComments';
import { getOnePost } from './postApi';
import { getPostComments } from './postApi';

export default function PostPage() {
    let { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState([]);

    const [refresh, setRefresh] = useState(false);

    const handleCommentCreated = () => {
        setRefresh(prev => !prev); 
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postData = await getOnePost(postId);
                setPost(postData);
                const commentsData = await getPostComments(postId);
                setComments(commentsData.content);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId,refresh]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading post: {error.message}</div>;
    }

    return (
        <div className='postPage'>
            {post && (
                <Paper style={{ height: '90vh', overflowY: 'scroll' }}>
                    <Post
                        isPage={true}
                        postData={post} 
                        postComments={<PostComments comments={comments} postId={postId} refresh={handleCommentCreated}
                        />} 
                    />
                </Paper>
            )}
        </div>
    );
}