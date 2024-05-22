import { useDispatch, useSelector} from 'react-redux';
import { Card, CardActions, CardMedia, Button, Typography, CardContent } from '@mui/material'
import { rejectFriendRequest, acceptFriendRequest, requests, getFriends} from '../../redux/friends/friendsThunks';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function ProfileRequestCard({friend}) {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    let urlID = useParams().id;
    urlID = parseInt(urlID);

    const { obj } = useSelector(state => state.profile.profileData);

    const handleConfirmation = async () => {
        await dispatch(acceptFriendRequest({
            userId: obj.id,
            friendId: friend.id,
            token: token
        }))
        await dispatch(requests({token}))
        await dispatch(getFriends({userId: urlID}))
    }

    const handleRejection = async () => {
        await dispatch(rejectFriendRequest({
            friendId: friend.id,
        }))
        await dispatch(requests({token}))
    }

    return (
        <Card sx={{ maxWidth: "200px", width: "-webkit-fill-available"}}>
            <NavLink to={`/profile/${friend.id}`} style={{textDecoration: "none"}}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={friend.avatar ? friend.avatar : '/profilePage/l60Hf.png'}
                    title="person"
                />
            </NavLink>
            <NavLink to={`/profile/${friend.id}`} style={{textDecoration: "none", color: "black"}}>
                <CardContent sx={{paddingBottom: 0, textAlign: "center"}}>
                    <Typography 
                    noWrap
                    gutterBottom 
                    variant="h5" 
                    component="div"
                    sx={{margin: 0}}
                    >{friend.name} {friend.surname}</Typography>
                </CardContent>
            </NavLink>
            <CardActions disableSpacing sx={{paddingTop: 0, display: "flex", flexDirection: "column", gap: '7px', marginTop: '17px'}}>
                <Button 
                variant="contained"  
                sx={{width: '100%', height: '30px', margin: 0}}
                onClick={handleConfirmation}
                >Add to friends</Button>
                <Button 
                color="error" 
                variant='contained'  
                sx={{width: '100%', height: '30px', margin: 0}}
                onClick={handleRejection}
                >Reject</Button>
            </CardActions>
        </Card>
    )
}

