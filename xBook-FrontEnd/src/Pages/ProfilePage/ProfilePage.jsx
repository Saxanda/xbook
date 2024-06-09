import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Avatar, Typography, Box } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { getPhoto } from '../../features/getPhoto';
import ModalEditProfile from '../../components/ModalEditProfile/ModalEditProfile';
import DeleteFriendModal from '../../components/ModalDeleteFriend/DeleteFriendModal';
import { userProfile, modalEditProfile, resetEditProfileState, editUser, getUserPosts } from '../../redux/profile/profileSlice';
import { modalDeleteFriendProfile } from '../../redux/friends/friendsSlice';
import { getFriends, sendFriendRequest, friendData, requests, acceptFriendRequest, deleteFriend } from '../../redux/friends/friendsThunks';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.scss';

export default function ProfilePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('token') || sessionStorage.getItem('token'));
    const [id, setID] = useState(null);
    let urlID = useParams().id;
    urlID = parseInt(urlID);

    const { obj, status, error } = useSelector((state) => state.profile.profileData);
    const editUserStatus = useSelector((state) => state.profile.editUserData);
    const deleteStatus = useSelector((state) => state.friends.deleteFriend);
    const modalDeleteFriendProfState = useSelector((state) => state.friends.modalDeleteFriendProf)
    
    const [linkPosts, setLinkPosts] = useState('focus');
    const [linkFriends, setLinkFriends] = useState('unfocus');
    const [linkRequests, setLinkRequests] = useState('unfocus');
    const location = useLocation();
    const indexSlash = location.pathname.lastIndexOf('/');
    const word = location.pathname.slice(indexSlash + 1);
    const [sent, setSent] = useState(false);
    const [accept, setAccepted] = useState(false);
    const inputBackgroundPhoto = useRef();
    const inputAvatarPhoto = useRef();
    const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 525);
    const [profilePage, setProfilePage] = useState(false);

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            setID(parseInt(decodedToken.sub));
        }
    }, [token]);

    useEffect(() => {
        if (id !== null) {
            getUser(id);
        }
    }, [id, editUserStatus, deleteStatus, urlID, token, sent, accept]);

    useEffect(() => {
        if (obj.user === 'myUser') {
            dispatch(requests({ page: 1 - 1 }));
        }
    }, [obj.user]);

    useEffect(() => {
        const handleResize = () => {
            setIsWideScreen(window.innerWidth > 525);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getUser = (userId) => {
        let newObj = {};
        if (userId === urlID) {
            newObj = {
                user: 'myUser',
                id: urlID,
            };
        } else {
            newObj = {
                user: 'anotherUser',
                id: urlID,
            };
        }
        dispatch(userProfile(newObj));
        dispatch(getFriends({ userId: urlID }));
        dispatch(getUserPosts({ page: 0, userId: urlID }));
    };

    const modalEditProfileOpen = () => {
        dispatch(modalEditProfile(true));
    };

    const clickSendRequest = async () => {
        await dispatch(sendFriendRequest({ friendId: urlID }));
        await setSent(true);
    };

    const downloadInputBackgroundPhoto = async (e) => {
        const file = e.target.files[0];
        const backPhoto = (await getPhoto(file)).data.url;
        let dataObj = {
            id: id,
            userObj: { photo: backPhoto },
        };
        dispatch(editUser(dataObj));
        dispatch(resetEditProfileState());
    };

    const downloadInputAvatar = async (e) => {
        const file = e.target.files[0];
        const avatarPhoto = (await getPhoto(file)).data.url;
        let dataObj = {
            id: id,
            userObj: { avatar: avatarPhoto },
        };
        dispatch(editUser(dataObj));
        dispatch(resetEditProfileState());
    };

    const clickInputBackgroundPhoto = () => {
        inputBackgroundPhoto.current.click();
    };

    const clickInputAvatar = () => {
        inputAvatarPhoto.current.click();
    };

    const clickLinkPosts = () => {
        setLinkPosts('focus');
        setLinkFriends('unfocus');
        setLinkRequests('unfocus');
    };

    const clickLinkFriends = () => {
        setLinkPosts('unfocus');
        setLinkFriends('focus');
        setLinkRequests('unfocus');
    };

    const clickLinkRequests = () => {
        setLinkPosts('unfocus');
        setLinkFriends('unfocus');
        setLinkRequests('focus');
    };

    if (word === 'profile' && linkPosts !== 'focus') {
        clickLinkPosts();
    } else if (linkFriends !== 'focus' && word === 'friends') {
        clickLinkFriends();
    } else if (linkRequests !== 'focus' && word === 'requests' && obj.user === 'myUser') {
        clickLinkRequests();
    } else if ((word !== 'friends' && linkFriends === 'focus') || (word !== 'requests' && linkRequests === 'focus')) {
        clickLinkPosts();
    }

    const handleConfirmation = async () => {
      await dispatch(acceptFriendRequest({
          userId: obj.id,
          friendId: urlID,
          token: token
      }));
      await setAccepted(true);
    }

    const modalDeleteFriendOpen = async () => {
      await dispatch(friendData({ id: urlID }));
      await dispatch(modalDeleteFriendProfile(true));
      setProfilePage(true)
  };

    const modalDeleteFriendClose = () => {
      dispatch(modalDeleteFriendProfile(false));
      setProfilePage(false)
    };

    const createNewChat = () => {
      navigate(`/chats/${urlID}`);
    };

    return (
        <>
        <DeleteFriendModal 
        open={modalDeleteFriendProfState} 
        onClose={modalDeleteFriendClose}
        onDelete={() => dispatch(deleteFriend({ friendId: urlID }))}
        friend={obj}
        profilePage = {profilePage}
        setProfilePage = {setProfilePage} 
        />
            {status === 'rejected' ? (
                <h1>Error: {error}</h1>
            ) : (
                <>
                    <ModalEditProfile />
                    <div style={{ backgroundColor: '#F0F2F5', height: "height: 100vh" }}>
                        <div className="profileImageWrapper">
                            <div className="profileHeader__cover">
                                <img
                                    className="profileHeader__photo"
                                    accept="image/*"
                                    src={obj.photo ? obj.photo : '/profilePage/default_background.jpg'}
                                    alt="background photo"
                                />
                                {obj.user === 'myUser' ? (
                                    <Button
                                        variant="contained"
                                        sx={{
                                            right: '1%',
                                            bottom: 0,
                                            position: 'absolute',
                                            marginBottom: '20px',
                                            backgroundColor: '#0866FF',
                                        }}
                                        onClick={clickInputBackgroundPhoto}
                                    >
                                        <CameraAltIcon 
                                        sx={{
                                          '@media (min-width: 525px)': {
                                            marginRight: "10px"
                                          },
                                        }}
                                        />
                                        {isWideScreen && 'UPLOAD'}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            ref={inputBackgroundPhoto}
                                            onChange={(e) => downloadInputBackgroundPhoto(e)}
                                        />
                                    </Button>
                                ) : null}

                                <div className="profileHeader__avatar">
                                    <Avatar
                                        alt="Avatar"
                                        src={obj.avatar ? obj.avatar : '/profilePage/l60Hf.png'}
                                        sx={{
                                            width: '128px',
                                            height: '128px',
                                            border: '5px solid white',
                                            position: 'absolute',
                                            objectFit: 'cover',
                                            '@media (min-width: 876px)': {
                                                width: '166px',
                                                height: '166px',
                                            },
                                        }}
                                    />
                                    {obj.user === 'myUser' ? (
                                        <Avatar
                                            sx={{
                                                right: '1%',
                                                top: '95px',
                                                position: 'absolute',
                                                width: '35px',
                                                height: '35px',
                                                '@media (min-width: 876px)': {
                                                    right: '-28%',
                                                    top: '130px',
                                                },
                                            }}
                                            onClick={clickInputAvatar}
                                        >
                                            <CameraAltIcon />
                                            <input
                                                type="file"
                                                style={{ display: 'none' }}
                                                ref={inputAvatarPhoto}
                                                onChange={(e) => downloadInputAvatar(e)}
                                            />
                                        </Avatar>
                                    ) : null}
                                </div>
                            </div>
                            <Box sx={{ backgroundColor: 'white', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
                                <div className="profileHeader__profile">
                                    <div className="profileHeader__info">
                                        <div className="profileHeader__userInfo">
                                            <Typography
                                                variant="h4"
                                                sx={{
                                                    color: 'black',
                                                    fontWeight: 700,
                                                    '@media (min-width: 876px)': {
                                                        mb: '70px',
                                                    },
                                                }}
                                            >
                                                {obj.name} {obj.surname}
                                            </Typography>
                                        </div>
                                        <div className="profileHeader__buttons">
                                        {obj.user === 'myUser' ? (
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        display: 'flex',
                                                        '@media (min-width: 876px)': {
                                                            marginRight: '16px',
                                                            alignSelf: 'flex-end',
                                                        },
                                                    }}
                                                    startIcon={<EditIcon />}
                                                    onClick={modalEditProfileOpen}
                                                >
                                                    Edit profile
                                                </Button>
                                            ) : (
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        gap: '7px',
                                                        '@media (min-width: 876px)': {
                                                            alignItems: 'flex-start',
                                                        },
                                                    }}
                                                >
                                                    {obj.status === 'ACCEPTED' ? (
                                                        <Button
                                                            color="error"
                                                            variant="outlined"
                                                            onClick={modalDeleteFriendOpen}
                                                            startIcon={<DeleteIcon />}
                                                            sx={{
                                                                borderRadius: '8px',
                                                            }}
                                                        >
                                                            DELETE
                                                        </Button>
                                                    ) : obj.user === 'anotherUser' && obj.status === 'NONE' ? (
                                                        <Button
                                                            color="primary"
                                                            variant="contained"
                                                            onClick={clickSendRequest}
                                                            startIcon={<PersonAddRoundedIcon />}
                                                            sx={{
                                                              borderRadius: '8px',
                                                            }}
                                                        >
                                                            Send request
                                                        </Button>
                                                    ) : obj.user === 'anotherUser' && obj.status === 'SENT' ? (
                                                        <Button variant="contained" disabled>
                                                            SENT
                                                        </Button>
                                                    ) : obj.user === 'anotherUser' && obj.status === 'PENDING' ? (
                                                        <Button 
                                                        variant="contained" 
                                                        onClick={handleConfirmation}
                                                        sx={{
                                                          borderRadius: '8px',
                                                        }}
                                                        >
                                                            Accept request
                                                        </Button>
                                                    ) : null }
                                                    <Button
                                                        color="secondary"
                                                        variant="contained"
                                                        onClick={createNewChat}
                                                        startIcon={<SendRoundedIcon />}
                                                        sx={{
                                                            borderRadius: '8px',
                                                        }}
                                                    >
                                                        Message
                                                    </Button>
                                                </Box>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="profileNav">
                                    <Link
                                        className={linkPosts === 'unfocus' ? 'profileNav__link' : 'profileNav__link profileNav__link--active'}
                                        onClick={clickLinkPosts}
                                        to=""
                                    >
                                        <div className={linkPosts === 'unfocus' ? 'profileNav__wrapper' : 'profileNav__wrapper profileNav__wrapper--active'}>
                                            <Typography
                                                className={linkPosts === 'unfocus' ? 'profileNav__item' : 'profileNav__item profileNav__item--active'}
                                                variant="subtitle1"
                                            >
                                                Posts
                                            </Typography>
                                        </div>
                                    </Link>
                                    <Link
                                        className={linkFriends === 'unfocus' ? 'profileNav__link' : 'profileNav__link profileNav__link--active'}
                                        onClick={clickLinkFriends}
                                        to="friends"
                                    >
                                        <div className={linkFriends === 'unfocus' ? 'profileNav__wrapper' : 'profileNav__wrapper profileNav__wrapper--active'}>
                                            <Typography
                                                className={linkFriends === 'unfocus' ? 'profileNav__item' : 'profileNav__item profileNav__item--active'}
                                                variant="subtitle1"
                                            >
                                                Friends
                                            </Typography>
                                        </div>
                                    </Link>
                                    {obj.user === 'myUser' && (
                                        <Link
                                            className={linkRequests === 'unfocus' ? 'profileNav__link' : 'profileNav__link profileNav__link--active'}
                                            onClick={clickLinkRequests}
                                            to="requests"
                                        >
                                            <div className={linkRequests === 'unfocus' ? 'profileNav__wrapper' : 'profileNav__wrapper profileNav__wrapper--active'}>
                                                <Typography
                                                    className={linkRequests === 'unfocus' ? 'profileNav__item' : 'profileNav__item profileNav__item--active'}
                                                    variant="subtitle1"
                                                >
                                                    Requests
                                                </Typography>
                                            </div>
                                        </Link>
                                    )}
                                </div>
                            </Box>
                            <div style={{ backgroundColor: '#F0F2F5', height: '100%' }}>
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
