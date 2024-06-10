import { Paper, Avatar, Typography, Box } from '@mui/material';
import './Sidbars.scss';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function SideBarFriendItem({friendData}){
    const navigate = useNavigate();
    const handleFriendClick = () => {
        const friendId = friendData.id;
        navigate(`/profile/${friendId}`);
    };
    return(
        <Paper className="friend-item" onClick={handleFriendClick}>
            <Box display="flex" alignItems="center" p={2}>
                <Avatar alt={`${friendData.name[0]} ${friendData.surname[0]}`} src={friendData.avatar} />
                <Typography variant="body1" style={{paddingLeft : "10px"}}>{friendData.name} {friendData.surname}</Typography>
            </Box>
        </Paper>
    );
}
SideBarFriendItem.propTypes = {
    friendData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
    }).isRequired
};