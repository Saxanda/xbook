import './ProfilePagePosts.scss'
import Typography from '@mui/material/Typography';
import CottageIcon from '@mui/icons-material/Cottage';
import CakeIcon from '@mui/icons-material/Cake';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { modalEditProfile } from '../../redux/profile/profileSlice';

export default function ProfilePagePosts(){
    const dispatch = useDispatch()
    let urlID = useParams().id;
    urlID = parseInt(urlID);
    const {obj} = useSelector(state => state.profile.profileData)   
    
    const modalEditProfileOpen = () => {
        dispatch(modalEditProfile(true));
    };

    return(
        <>
            <div className='profilePosts'>
                <div className='profilePosts__info'>
                    <div className='userInfo'>
                        <Typography variant='h6' sx={{fontWeight: 600}}>About</Typography>
                        <ul className='userInfo__list'>
                            {
                                obj.address ?
                            <li className='userInfo__item'>
                                <CottageIcon color='action' sx={{marginRight: "12px"}}/>
                                <Typography variant='subtitle2'>
                                    Live in <span>{obj.address}</span>
                                </Typography>
                            </li>
                            :
                            null
                            }
                            {
                                obj.dob ?
                            <li className='userInfo__item'>
                                <CakeIcon color='action' sx={{marginRight: "12px"}}/>
                                <Typography variant='subtitle2'>
                                    {obj.dob}
                                </Typography>
                            </li>
                            :
                            null
                            }
                            {
                                obj.email ?
                            <li className='userInfo__item'>
                                <EmailIcon color='action'  sx={{marginRight: "12px"}}/>
                                <Typography variant='subtitle2'>
                                    {obj.email}
                                </Typography>
                            </li>
                            : 
                            null
                            }

                            {
                                obj.gender ?
                            <li className='userInfo__item'>
                                {obj.gender === "men" || obj.gender === "male"? 
                                    <MaleIcon color='action'  sx={{marginRight: "12px"}}/>
                                    :
                                    <FemaleIcon color='action'  sx={{marginRight: "12px"}}/>
                                }
                                <Typography variant='subtitle2'>
                                    {obj.gender}
                                </Typography>
                            </li>
                            : 
                            null
                            }
                        </ul>
                        {
                            obj.user === "myUser" ?
                            <Button 
                            variant="contained"
                            color='info'
                            onClick={modalEditProfileOpen} 
                            sx={{
                                width: "100%", 
                                marginTop: "16px"
                            }}
                            >Edit Bio</Button>
                            :
                            null
                        }
                    </div>
                </div>
                <div>
                    <div style={{maxWidth: "500px", width: "300px", height: "128px", backgroundColor: "grey", marginBottom: "16px"}}>
                    </div>
                    <div style={{maxWidth: "500px", width: "300px", height: "93px", backgroundColor: "grey", marginBottom: "16px"}}>
                    </div>
                    <div style={{maxWidth: "500px", width: "300px", height: "500px", backgroundColor: "grey"}}>
                    </div>
                </div>
            </div>
        </>
    )
}