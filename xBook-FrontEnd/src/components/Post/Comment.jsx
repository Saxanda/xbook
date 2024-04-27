
import PropTypes from 'prop-types';
import { Avatar, Typography , Box } from '@mui/material';

export default function Comment({ comment }) {

    const user = comment.user;
    const text = comment.text;
    return (
        <div className="comment">
            <Avatar src={user.avatar} alt={user.fullName} />
            <Box sx={{ ml: 2 }} className="comment-body">
                <Typography variant="subtitle1" fontWeight="bold">{user.fullName}</Typography>
                <Typography variant="body1">{text}</Typography>
            </Box>
        </div>
    );
}

Comment.propTypes = {
    comment: PropTypes.shape({
        user: PropTypes.shape({
            avatar: PropTypes.string.isRequired,
            fullName: PropTypes.string.isRequired
        }).isRequired,
        text: PropTypes.string.isRequired
    }).isRequired
};