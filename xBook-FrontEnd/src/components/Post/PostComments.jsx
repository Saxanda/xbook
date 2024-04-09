import PropTypes from 'prop-types';
import {  Paper, Box, TextField, Avatar} from '@mui/material';
import Comment from './Comment';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import InputAdornment from '@mui/material/InputAdornment';

export default function PostComments({ comments }) {

    const [newComment, setNewComment] = useState('');

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = () => {
       //-----------

       //-----------
        console.log('Новий коментар:', newComment);
        setNewComment('');
    };

    return (
        <Paper elevation={3} className="post-comments">
            <div className="comment-list">
                {comments.map((comment, index) => (
                    <Comment key={index} comment={comment} />
                ))}
            </div>
            <Box display="flex" alignItems="center" mt={2} style={{ padding: "10px" }}>
            <Avatar src={"https://n1s1.hsmedia.ru/5a/71/08/5a7108a17f3e61267b8f796f1450feed/1280x1280_0xjqJeoj1t_3175775419840025932.jpg"} alt={"SKUF"} />
                <TextField
                    fullWidth
                    multiline
                    label="Add a comment"
                    variant="outlined"
                    rows={3}
                    value={newComment}
                    onChange={handleCommentChange}
                    style={{ marginLeft: '10px', flex: 1}}
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
        </Paper>
    );
}

PostComments.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            user: PropTypes.shape({
                fullName: PropTypes.string.isRequired
            }).isRequired,
            text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired
};