import PropTypes from 'prop-types';
import { Box, TextField, Avatar} from '@mui/material';
import Comment from './Comment';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';
import { createComment } from './postApi';

export default function PostComments({ comments, postId }) {

    const [newComment, setNewComment] = useState('');

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault(); // Щоб запобігти перезавантаженню сторінки
        try {
            await createComment(newComment, postId);
            setNewComment('');
        } catch (err) {
            console.error('Error creating comment:', err);
        }
    };

    return (
        <div>
            <Box elevation={3} className="post-comments no-scrollbar"
                style={{ overflowY: 'auto' }}
            >
                <div className="comment-list">
                    {comments.map((comment, index) => (
                        <Comment key={index} comment={comment} />
                    ))}
                </div>
            </Box>
            <Box display="flex" alignItems="center" mt={2} 
                    style={{ 
                        margin : 0,
                        padding: "10px", 
                        width: "100%", 
                        boxSizing: "border-box",
                        backgroundColor: "white",
                        borderTop: "1px solid rgba(0, 0, 0, 0.1)"
                        }}>
                <Avatar src={"https://n1s1.hsmedia.ru/5a/71/08/5a7108a17f3e61267b8f796f1450feed/1280x1280_0xjqJeoj1t_3175775419840025932.jpg"} alt={"SKUF"} />
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
    comments: PropTypes.array.isRequired
};