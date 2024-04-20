import "./ProfilePage.scss"
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AvatarGroup from '@mui/material/AvatarGroup';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { NavLink, Outlet } from 'react-router-dom';

export default function ProfilePage({userData}) {

    return (
        <>
        <header className='profileHeader'>
            <div className="profileImageWrapper">
                <div className="profileHeader__cover">
                    <img className="profileHeader__photo" src={userData.header_photo} alt="header photo" />
                    <Button
                    variant="contained"
                    startIcon={<CameraAltIcon />}
                    sx={{
                        left: "78%",
                        top: "300px",
                        position: 'absolute',
                        backgroundColor: '#0866FF',
                    }}
                    >
                        Edit cover photo
                    </Button>

                    <div className="profileHeader__avatar">
                        <Avatar
                        alt="Avatar"
                        src={userData.avatar}
                        sx={{
                            width: 176,
                            height: 176,
                            border: '5px solid white',
                            position: 'absolute',
                            objectFit: "cover",
                        }} />
                        <Avatar sx={{
                        left: 130,
                        top: "130px",
                        position: "absolute",
                        }}>
                            <CameraAltIcon />
                        </Avatar>
                    </div>
                </div>
            </div>
            <div className="profilePageWrapper">
                <div className='profileHeader__profile'>
                    <div className='profileHeader__info'>
                        <div className='profileHeader__userInfo'>
                            <Typography variant='h4' sx={{color: "black", fontWeight: 700}}>{userData.name} {userData.surname}</Typography>
                            <Typography variant='subtitle1'>{userData.friends.length} friends</Typography>
                            <AvatarGroup max={3}sx={{justifyContent: 'start'}}>
                                {userData.friends.map((friend, index) => {
                                    return <Avatar key={index} alt={friend.username} src={friend.avatar} />
                                })}
                            </AvatarGroup>
                        </div>
                        <div className='profileHeader__buttons'>
                            <Button 
                            variant="contained" 
                            sx={{
                                position: 'static',
                                backgroundColor: '#0866FF',
                            }}
                            startIcon={<EditIcon />}
                            >
                                Edit profile
                            </Button>
                        </div>
                </div>
                </div>
                <ul className='profileNav'>
                    <li className='profileNav__link'>
                        <NavLink className='profileNav__item' to="/">
                            <Typography variant='subtitle1'>Posts</Typography>
                        </NavLink>
                    </li>
                    <li className='profileNav__link'>
                        <NavLink className='profileNav__item' to="friends">
                            <Typography variant='subtitle1'>Friends</Typography>
                        </NavLink>
                    </li>
                </ul>
            </div>        
        </header >
        <main style={{backgroundColor: "#F0F2F5", height: "100%", paddingTop: "20px"}}>
            <div className="profilePageWrapper">
                <Outlet />
            </div>
        </main>

        </>
    )
}



