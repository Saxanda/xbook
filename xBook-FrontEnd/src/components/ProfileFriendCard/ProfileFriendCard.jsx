import "./ProfileFriendCard.scss"
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProfileFriendCard({ friend, onDelete }) {
    const { id, avatar, name, surname, dob, address } = friend;
    const { obj } = useSelector(state => state.profile.profileData);

    return (
        <div className="friendCard">
            <div style={{ display: "flex" }}>
                <NavLink to={`/profile/${friend.id}`} style={{ textDecoration: "none" }}>
                    <Avatar variant='rounded'
                        sx={{ height: 80, width: 80, marginRight: "16px" }}
                        alt="friend"
                        src={avatar ? avatar : '/profilePage/l60Hf.png'}
                    />
                </NavLink>
                <div className="friendCard__info">
                    <NavLink to={`/profile/${friend.id}`} style={{ textDecoration: "none", color: "black" }}>
                        <Typography
                            sx={{
                                fontWeight: "bold",
                                fontSize: "16px"
                            }}
                            variant='subtitle2'
                        >{name} {surname}</Typography>
                    </NavLink>
                    <Typography variant="caption">{address ? `Lives in ${address}` : dob ? `Birthday: ${dob}` : null}</Typography>
                </div>
            </div>
            {obj.user === "myUser" && <div className="iconWrapper">
                    <IconButton
                        aria-label="delete"
                        onClick={onDelete}
                    >
                        <PersonRemoveIcon sx={{ color: "red" }} />
                    </IconButton>
                </div>}

        </div>
    )
}
