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

export default function PostFooter({ likes, id, originalPostId }) {
    const [isRepostModalOpen, setRepostModalOpen] = useState(false);

    const navigate = useNavigate();

    const handleCommentButtonClick = () => {
        navigate(`/post/${id}`);
    };

    const handleRepostButtonClick = () => {
        setRepostModalOpen(true);
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
                                {/* <Typography variant="body1">{comments} Comments </Typography>
                                <Typography variant="body1">Reposts {reposts}</Typography> */}
                            </div>
                        </div>
                        <div className="postComponent_footer_activiti_btns">
                            <IconButton variant="contained" aria-label="like">
                                <ThumbUpIcon />
                            </IconButton>
                            <IconButton variant="contained" aria-label="favorite">
                                <FavoriteIcon />
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
                postId={originalPostId !== null ? originalPostId : id}
            />
        </>
    );
}

PostFooter.propTypes = {
    likes: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    originalPostId: PropTypes.number,
};
