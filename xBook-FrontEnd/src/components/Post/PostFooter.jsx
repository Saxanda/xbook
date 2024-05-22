import { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import RepeatIcon from '@mui/icons-material/Repeat';
import CommentIcon from '@mui/icons-material/Comment';
import { useNavigate } from 'react-router-dom';
import CreateRepostModal from './CreateRepostModal';
import { likePost } from './postApi';

export default function PostFooter({ likes, id, originalPost, comments, reposts, refresh, addToBookmarks }) {
    const [isRepostModalOpen, setRepostModalOpen] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const navigate = useNavigate();

    const handleLikeButtonClick = async () => {
        try {
            const result = await likePost(id);
            console.log('Post liked:', result);
        } catch (error) {
            console.error('Error handling like button click:', error);
        }
    };

    const handleCommentButtonClick = () => {
        navigate(`/post/${id}`);
    };

    const handleRepostButtonClick = () => {
        setRepostModalOpen(true);
    };

    const handleFavoriteButtonClick = async () => {
        setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);
        try {
            
            await addToBookmarks(id);
            console.log('Post added to bookmarks');
        } catch (error) {
            console.error('Error handling favorite button click:', error);
        }
    };

    const handleRepostModalClose = () => {
        setRepostModalOpen(false);
    };

    return (
        <>
            <Paper>
                <div className="postComponent_footer">
                    <div className="postComponent_footer_activiti">
                        <div className='postComponent_footer_activiti_info'>
                            <Typography variant="body1">Likes {likes}</Typography>
                            <div style={{ display: 'flex', gap: "10px" }}>
                                <Typography variant="body1">{comments} Comments </Typography>
                                <Typography variant="body1">Reposts {reposts}</Typography>
                            </div>
                        </div>
                        <div className="postComponent_footer_activiti_btns">
                            <IconButton variant="contained" aria-label="like" onClick={handleLikeButtonClick}>
                                <ThumbUpIcon />
                            </IconButton>
                            <IconButton variant="contained" aria-label="favorite" onClick={handleFavoriteButtonClick}>
                                <FavoriteIcon color={isBookmarked ? "primary" : "default"} />
                            </IconButton>
                            <IconButton variant="contained" aria-label="repost" onClick={handleRepostButtonClick}>
                                <RepeatIcon />
                            </IconButton>
                            <IconButton variant="contained" aria-label="comment" onClick={handleCommentButtonClick}>
                                <CommentIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </Paper>

            <CreateRepostModal
                open={isRepostModalOpen}
                handleClose={handleRepostModalClose}
                postId={originalPost !== null ? originalPost.id : id}
                refresh={refresh}
            />
        </>
    );
}

PostFooter.propTypes = {
    likes: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    originalPost: PropTypes.object,
    reposts: PropTypes.number,
    comments: PropTypes.number,
    refresh: PropTypes.func.isRequired,
    addToBookmarks: PropTypes.func.isRequired 
};
