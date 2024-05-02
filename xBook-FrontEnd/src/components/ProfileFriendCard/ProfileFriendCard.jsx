import "./ProfileFriendCard.scss"
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';


export default function ProfileFriendCard({friend}) {
    
    return(
        <div className="friendCard">
            <Avatar variant='rounded' sx={{height: 80, width: 80, marginRight: "16px"}} alt={friend.username} src={friend.avatar} />
            <div className="friendCard__info">
                <Typography variant='subtitle2'>{friend.name} {friend.surname}</Typography>
                <Typography variant="caption">{friend.location}</Typography>
            </div>
            <div>
                <IconButton aria-label="delete">
                    <PersonRemoveIcon />
                </IconButton>
            </div>

        </div>
    )
}