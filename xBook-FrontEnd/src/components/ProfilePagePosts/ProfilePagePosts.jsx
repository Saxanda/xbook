import './ProfilePagePosts.scss'
import Typography from '@mui/material/Typography';
import CottageIcon from '@mui/icons-material/Cottage';
import CakeIcon from '@mui/icons-material/Cake';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

export default function ProfilePagePosts({userData}){

    return(
        <>
            <div className='profilePosts'>
                <div className='profilePosts__info'>
                    <div className='userInfo'>
                        <Typography variant='h6' sx={{fontWeight: 600}}>About</Typography>
                        <ul className='userInfo__list'>
                            <li className='userInfo__item'>
                                <CottageIcon color='action' sx={{marginRight: "12px"}}/>
                                <Typography variant='subtitle2'>
                                    Live in <span>Kyiv, Ukraine</span>
                                </Typography>
                            </li>
                            <li className='userInfo__item'>
                                <CakeIcon color='action' sx={{marginRight: "12px"}}/>
                                <Typography variant='subtitle2'>
                                    {userData.date_of_birth}
                                </Typography>
                            </li>
                        </ul>
                        <Button 
                        variant="contained"
                        color='info' 
                        sx={{
                            width: "-webkit-fill-available", 
                            marginTop: "16px"}}
                        >Edit Bio</Button>
                    </div>
                    <div className='userFriends'>
                        <div className='userFriends__info'>
                            <div>
                                <Typography variant='h6' sx={{fontWeight: 600}}>Friends</Typography>
                                <Typography variant='subtitle1'>{userData.friends.length} friends</Typography>
                            </div>
                                <Button>Show all friends</Button>
                        </div>
                        <ul className='userFriends__list'>
                            {userData.friends.map((friend, index) => {
                                return <li className='userFriends__item'>
                                    <Avatar key={index} variant='rounded' alt={friend.username} src={friend.avatar} />
                                    <Typography 
                                    key={index} 
                                    variant='caption'
                                    sx={{wordBreak: "break-all"}}
                                    >{friend.name} {friend.surname}</Typography>
                                </li>
                                
                            })}
                        </ul>
                    </div>
                </div>
                <div>
                    <div style={{width: "500px", height: "128px", backgroundColor: "yellow", marginBottom: "16px"}}></div>
                    <div style={{width: "500px", height: "93px", backgroundColor: "yellow", marginBottom: "16px"}}></div>
                    <div style={{width: "500px", height: "500px", backgroundColor: "yellow"}}></div>
                </div>
            </div>
        </>
    )
}