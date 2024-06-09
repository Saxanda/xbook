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
import { likePost, deleteLike } from './postApi';
import "./Posts.scss"

export default function PostFooter({ likes, id, originalPost, comments, reposts, refresh, isLiked, bookmarked, addToBookmarks, removeFromBookmarks }) {
    const navigate = useNavigate();
    const [isBookmarked, setIsBookmarked] = useState(bookmarked);
    const [isRepostModalOpen, setRepostModalOpen] = useState(false);
    const [liked, setLiked] = useState(isLiked);
    const [likeCount,setLikeCount] = useState(likes);


    const handleLikeButtonClick = async () => {
        try {
            if (!liked) {
                const result = await likePost(id);
                console.log('Post liked:', result);
                setLiked(true);
                setLikeCount(likeCount+1) ;
            } else {
                const result = await deleteLike(id);
                console.log('Like removed:', result);
                setLiked(false);
                setLikeCount(likeCount-1) ;
            }
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
        try {
            if (isBookmarked) {
                await removeFromBookmarks(id);
                console.log('Post removed from bookmarks');
            } else {
                await addToBookmarks(id);
                console.log('Post added to bookmarks');
            }
            setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);
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
                            <Typography variant="body1">
                                {`Likes ${likeCount}`}
                            </Typography>
                            <div style={{ display: 'flex', gap: "10px" }}>
                                <Typography variant="body1">{comments} Comments </Typography>
                                <Typography variant="body1">Reposts {reposts}</Typography>
                            </div>
                        </div>
                        <div className="postComponent_footer_activiti_btns">
                            <IconButton className='posts__button like' variant="contained" aria-label="like" onClick={handleLikeButtonClick}>
                                <ThumbUpIcon color={liked ? 'primary' : 'default'} />
                            </IconButton>
                            <IconButton className='posts__button favorite' variant="contained" aria-label="favorite" onClick={handleFavoriteButtonClick}>
                                <FavoriteIcon color={isBookmarked ? "primary" : "default"} />
                            </IconButton>
                            <IconButton className='posts__button repost' variant="contained" aria-label="repost" onClick={handleRepostButtonClick}>
                                <RepeatIcon />
                            </IconButton>
                            <IconButton className='posts__button comment' variant="contained" aria-label="comment" onClick={handleCommentButtonClick}>
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
    refresh: PropTypes.func,
    isLiked: PropTypes.bool,
    addToBookmarks: PropTypes.func,
    removeFromBookmarks: PropTypes.func,
    bookmarked: PropTypes.bool,
    bookmarkId: PropTypes.string,
};
