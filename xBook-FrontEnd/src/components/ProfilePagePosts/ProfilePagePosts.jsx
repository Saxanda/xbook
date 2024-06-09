import './ProfilePagePosts.scss';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CottageIcon from '@mui/icons-material/Cottage';
import CakeIcon from '@mui/icons-material/Cake';
import EmailIcon from '@mui/icons-material/Email';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { useSelector, useDispatch } from 'react-redux';
import { modalEditProfile } from '../../redux/profile/profileSlice';
import ProfilePostsList from '../ProfilePostsList/ProfilePostsList';
import CreatePost from '../Post/CreatePost';
import { useState } from 'react';

export default function ProfilePagePosts() {
    const { obj } = useSelector(state => state.profile.profileData);
    const dispatch = useDispatch();

    const modalEditProfileOpen = () => {
        dispatch(modalEditProfile(true));
    };

    const [refresh, setRefresh] = useState(false);

    const handlePostCreated = () => {
        setRefresh(prev => !prev);
    };

    return (
        <>
            <div className='profilePosts'>
                <div className='profilePosts__info'>
                    <Paper elevation={3} sx={{ borderRadius: "8px", marginTop: "20px" }}>
                        <div className='userInfo'>
                            <Typography variant='h6' sx={{ fontWeight: 600 }}>About</Typography>
                            <ul className='userInfo__list'>
                                {obj.address &&
                                    <li className='userInfo__item'>
                                        <CottageIcon color='action' sx={{ marginRight: "12px", padding: "6px 0 6px 0" }} />
                                        <Typography variant='subtitle2' sx={{padding: "6px 0 6px 0"}}>
                                            Lives in <span>{obj.address}</span>
                                        </Typography>
                                    </li>
                                }
                                {obj.dob &&
                                    <li className='userInfo__item'>
                                        <CakeIcon color='action' sx={{ marginRight: "12px", padding: "6px 0 6px 0"}} />
                                        <Typography variant='subtitle2' sx={{padding: "6px 0 6px 0", alignSelf: "flex-end"}}>
                                            {obj.dob}
                                        </Typography>
                                    </li>
                                }
                                {obj.email &&
                                    <li className='userInfo__item'>
                                        <EmailIcon color='action' sx={{ marginRight: "12px", padding: "6px 0 6px 0" }} />
                                        <Typography variant='subtitle2' sx={{padding: "6px 0 6px 0"}}>
                                            {obj.email}
                                        </Typography>
                                    </li>
                                }
                                {obj.gender &&
                                    <li className='userInfo__item'>
                                        {obj.gender === "man" || obj.gender === "male" ?
                                            <MaleIcon color='action' sx={{ marginRight: "12px", padding: "6px 0 6px 0" }} />
                                            : obj.gender === "woman" || obj.gender === "female" ?
                                                <FemaleIcon color='action' sx={{ marginRight: "12px", padding: "6px 0 6px 0" }} />
                                                :
                                                <TransgenderIcon color='action' sx={{ marginRight: "12px", padding: "6px 0 6px 0" }} />
                                        }
                                        <Typography variant='subtitle2' sx={{padding: "6px 0 6px 0"}}>
                                            {obj.gender}
                                        </Typography>
                                    </li>
                                }
                            </ul>
                        </div>
                    </Paper>
                </div>
                <div className='profilePosts__section'>
                    {obj.user === "myUser" ? <CreatePost onPostCreated={handlePostCreated} style={{ marginTop: 0 }} /> : null}
                    <ProfilePostsList refresh={refresh} handlePostCreated={handlePostCreated} />
                </div>
            </div>
        </>
    );
}
