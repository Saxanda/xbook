import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function PostFooter({ likes, comments, reposts }) {
    return (
            <Paper >
            <div className="postComponent_footer">
                <div className="postComponent_footer_activiti">
                <div className='postComponent_footer_activiti_info'>
                    <Typography variant="body1">Likes {likes}</Typography>
                    <div style={{ display: 'flex' , gap : "10px" }}>
                        <Typography variant="body1">{comments} Comments </Typography>
                        <Typography variant="body1">Reposts {reposts}</Typography>
                    </div>
                </div>
                <div className="postComponent_footer_activiti_btns">
                    <Button variant="contained">Like</Button>
                    <Button variant="contained">Comment</Button>
                    <Button variant="contained">Repost</Button>
                </div>
                </div>
                {/* <div className="postComponent_footer_comments">
                {comments.map((comment, index) => (
                    <div key={index} >
                    <Typography variant="body1">By: {comment.user.fullName}</Typography>
                    <Typography variant="body1">{comment.text}</Typography>
                    </div>
                ))}
                </div> */}
            </div>
            </Paper>
        );
}

PostFooter.propTypes = {
    likes: PropTypes.number.isRequired,
    reposts : PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            user: PropTypes.shape({
                username: PropTypes.string.isRequired,
                avatar: PropTypes.string.isRequired,
                fullName: PropTypes.string.isRequired
            }).isRequired,
            text: PropTypes.string.isRequired,
        })
    ).isRequired
};
