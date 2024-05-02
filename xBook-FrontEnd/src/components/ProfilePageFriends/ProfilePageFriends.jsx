import './ProfilePageFriends.scss'
import Typography from '@mui/material/Typography';
import ProfileFriendCard from '../ProfileFriendCard/ProfileFriendCard';

export default function ProfilePageFriends({userData}) {
    
    return(
        <div className='profileFriends'>
            <Typography variant='h6' sx={{fontWeight: 600}}>Friends</Typography>
            <ul className='friendsList'>
                {userData.friends.map(friend => (
                    <li key={friend.id}>
                      <ProfileFriendCard friend={friend} />
                    </li>
                ))}
            </ul>
        </div>
    )
}