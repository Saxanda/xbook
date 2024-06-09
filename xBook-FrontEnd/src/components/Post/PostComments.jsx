import PropTypes from 'prop-types';
import { Box, TextField } from '@mui/material';
import Comment from './Comment';
import { useState, useEffect, useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import { createComment, getPostComments } from './postApi';
import AuthorAvatar from './sideComponents/AuthorAvatar';

export default function PostComments({ postId }) {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        loadComments(0);
    }, [postId]);

    const loadComments = useCallback(async (page) => {
        if (loading) return;
        setLoading(true);
        try {
            const commentsData = await getPostComments(postId, page);
            if (commentsData.content.length === 0) {
                setHasMore(false);
            } else {
                setComments(prevComments => page === 0 ? commentsData.content : [...prevComments, ...commentsData.content]);
                setPage(page);
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
        } finally {
            setLoading(false);
        }
    }, [loading, postId]);

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        try {
            await createComment(newComment, postId);
            setNewComment('');
            setHasMore(true);
            loadComments(0);
        } catch (err) {
            console.error('Error creating comment:', err);
        }
    };

    const handleScroll = useCallback((event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;
        if (scrollHeight - scrollTop <= clientHeight + 50 && hasMore && !loading) {
            loadComments(page + 1);
        }
    }, [loadComments, hasMore, loading, page]);

    return (
        <div>
            <Box elevation={3} className="post-comments no-scrollbar" style={{ overflowY: 'auto' }} onScroll={handleScroll}>
                <div className="comment-list">
                    {comments.map((comment, index) => (
                        <Comment key={index} comment={comment} />
                    ))}
                </div>
                {loading && <div>Loading more comments...</div>}
            </Box>
            <Box
                display="flex"
                alignItems="center"
                mt={2}
                style={{
                    margin: 0,
                    padding: "10px",
                    width: "100%",
                    boxSizing: "border-box",
                    backgroundColor: "white",
                    borderTop: "1px solid rgba(0, 0, 0, 0.1)"
                }}
            >
                <AuthorAvatar />
                <TextField
                    fullWidth
                    multiline
                    label="Add a comment"
                    variant="outlined"
                    rows={3}
                    value={newComment}
                    onChange={handleCommentChange}
                    style={{ marginLeft: '10px', flex: 1, alignSelf: 'flex-end' }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    color="primary"
                                    onClick={handleCommentSubmit}
                                    edge="end"
                                    style={{ alignSelf: 'flex-start' }}
                                >
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
            </Box>
        </div>
    );
}

PostComments.propTypes = {
    postId: PropTypes.string.isRequired,
};