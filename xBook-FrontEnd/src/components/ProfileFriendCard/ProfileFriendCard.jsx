import "./ProfileFriendCard.scss"
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { friendData } from "../../redux/friends/friendsThunks";
import { modalDeleteFriend } from "../../redux/friends/friendsSlice";
import DeleteFriendModal from "../ModalDeleteFriend/DeleteFriendModal.jsx";

export default function ProfileFriendCard({friend}) {

    const {id, avatar, name, surname, dob, address} = friend;
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const { obj } = useSelector(state => state.profile.profileData);

    const modalDeleteFriendOpen = () => {
        dispatch(friendData({id}));
        dispatch(modalDeleteFriend(true));
    };
    
    return(
        <div className="friendCard">
            <DeleteFriendModal />
            <div style={{display: "flex"}}>
                <NavLink to={`/profile/${friend.id}`} style={{textDecoration: "none"}}>
                    <Avatar variant='rounded' 
                    sx={{height: 80, width: 80, marginRight: "16px"}} 
                    alt="friend" 
                    src={avatar ? avatar : '/profilePage/l60Hf.png'} 
                    />
                </NavLink>
                <div className="friendCard__info">
                    <NavLink to={`/profile/${friend.id}`} style={{textDecoration: "none", color: "black"}}>
                        <Typography variant='subtitle2'>{name} {surname}</Typography>
                    </NavLink>
                    <Typography variant="caption">{address ? `Lives in ${address}`: dob ? `Birthday: ${dob}`: null}</Typography>
                </div>
            </div>
            {
            obj.user === "myUser" ?    
            <div className="iconWrapper">
                <IconButton 
                aria-label="delete"
                onClick={modalDeleteFriendOpen}
                >
                    <PersonRemoveIcon />
                </IconButton>
            </div>
            :
            null
            }

        </div>
    )
}