import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

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
                <Button variant="contained">...</Button>
                <Button variant="contained" color="error">X</Button>
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