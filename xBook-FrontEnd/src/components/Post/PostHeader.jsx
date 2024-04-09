import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';

export default function PostHeader({ userData, date }) {
    return (
        <div className="postComponent_header">
            <div className="postComponent_header_userinfo">
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={userData.avatar} alt="User Avatar" />
                    <div>
                        <Typography variant="h6">{userData.fullName}</Typography>
                        <Typography variant="body2" color="textSecondary">{date}</Typography>
                    </div>
                </Stack>
            </div>
            <div className="postComponent_header_btns">
                <IconButton variant="contained" aria-label="more options">
                    <MoreVertIcon />
                </IconButton>
                <IconButton variant="contained" aria-label="close">
                    <CloseIcon />
                </IconButton>
            </div>
        </div>
    );
}

PostHeader.propTypes = {
    userData: PropTypes.shape({
        avatar: PropTypes.string.isRequired,
        fullName: PropTypes.string.isRequired
    }).isRequired,
    date: PropTypes.string.isRequired
};