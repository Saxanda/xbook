import { useDispatch, useSelector } from 'react-redux';
import { Button, Typography, Avatar, Paper } from '@mui/material';
import { rejectFriendRequest, acceptFriendRequest } from '../../redux/friends/friendsThunks';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CakeIcon from '@mui/icons-material/Cake';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import './ProfileRequestCard.scss'

export default function ProfileRequestCard({ friend, onActionComplete }) {
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
        }));
        onActionComplete(friend.id);
    }

    const handleRejection = async () => {
        await dispatch(rejectFriendRequest({
            friendId: friend.id,
        }));
        onActionComplete(friend.id);
    }

    return (
        <Paper elevation={3} sx={{
            borderRadius: "25px 25px 25px 25px",
        }}>
            <div className="card">
                <div className="image-content">
                    <span className="overlay"></span>
                    <div className="card-image">
                        <NavLink to={`/profile/${friend.id}`} style={{ textDecoration: "none" }}>
                            <Avatar 
                            sx={{
                                width: "110px",
                                height: "110px",
                                border: '4px solid #1976d2',
                            }}
                            src={friend.avatar ? friend.avatar : '/profilePage/l60Hf.png'} alt="request photo"/>
                        </NavLink>
                    </div>
                </div>
                <div className="card-content">
                    <NavLink to={`/profile/${friend.id}`} style={{ textDecoration: "none", color: "black" }}>
                        <Typography
                            noWrap
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{ 
                                margin: "11px 0 0 0",
                                maxWidth: '190px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >{friend.name} {friend.surname}</Typography>
                    </NavLink>
                    <ul className='requestInfo__list'>
                        {friend.dob &&
                            <li className='requestInfo__item'>
                                <CakeIcon color='action' sx={{ marginRight: "12px", padding: "6px 0 6px 0" }} />
                                <Typography variant='subtitle2'sx={{padding: "6px 0 6px 0", alignSelf: "flex-end"}}>
                                    {friend.dob}
                                </Typography>
                            </li>
                        }
                        {friend.gender &&
                            <li className='requestInfo__item'>
                                {friend.gender === "man" || friend.gender === "male" ?
                                    <MaleIcon color='action' sx={{ marginRight: "12px", padding: "6px 0 6px 0" }} />
                                    : friend.gender === "woman" || friend.gender === "female" ?
                                        <FemaleIcon color='action' sx={{ marginRight: "12px", padding: "6px 0 6px 0" }} />
                                        :
                                        <TransgenderIcon color='action' sx={{ marginRight: "12px", padding: "6px 0 6px 0" }} />
                                }
                                <Typography variant='subtitle2'sx={{padding: "6px 0 6px 0"}}>
                                    {friend.gender}
                                </Typography>
                            </li>
                        }
                    </ul>
                    <div style={{paddingTop: 0, display: "flex", flexDirection: "column", gap: '7px'}}>
                        <Button
                            variant="contained"
                            sx={{ width: '100%', height: '30px', margin: 0, borderRadius: "50px", padding: '18px' }}
                            onClick={handleConfirmation}
                        >Add to friends</Button>
                        <Button
                            color="error"
                            variant='contained'
                            sx={{ width: '100%', height: '30px', margin: 0, borderRadius: "50px", padding: '18px' }}
                            onClick={handleRejection}
                        >Reject</Button>
                    </div>
                </div>
            </div>
        </Paper>
    );
}
