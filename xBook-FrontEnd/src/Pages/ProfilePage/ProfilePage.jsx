import "./ProfilePage.scss"
import { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import { NavLink, Outlet, useParams, useLocation} from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { getPhoto } from "../../features/getPhoto";
import ModalEditProfile from "../../components/ModalEditProfile/ModalEditProfile";
import DeleteFriendModal from "../../components/ModalDeleteFriend/DeleteFriendModal";
import { userProfile, modalEditProfile, resetEditProfileState, editUser, getUserPosts, getUserPostsContent} from "../../redux/profile/profileSlice";
import { modalDeleteFriend} from "../../redux/friends/friendsSlice";
import { getFriends, sendFriendRequest, friendData, requests} from "../../redux/friends/friendsThunks";
import { createHandleScroll } from "../../features/createScroll";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";


export default function ProfilePage() {

    const dispatch = useDispatch();
    const [token, setToken] = useState(localStorage.getItem("token") || sessionStorage.getItem("token"))
    
    const [id, setID] = useState(null)
    let urlID = useParams().id;
    urlID = parseInt(urlID);

    const { obj, status, error } = useSelector(state => state.profile.profileData);
    const editUserStatus = useSelector(state => state.profile.editUserData);
    const deleteStatus = useSelector(state => state.friends.deleteFriend);
    const [linkPosts, setLinkPosts] = useState("focus");
    const [linkFriends, setLinkFriends] = useState("unfocus");
    const [linkRequests, setLinkRequests] = useState("unfocus");
    const location = useLocation();
    const indexSlash = location.pathname.lastIndexOf('/');
    const word = location.pathname.slice(indexSlash + 1);
    const [sended, setSended] = useState(false);
    const inputBackgroundPhoto = useRef();
    const inputAvatarPhoto = useRef();
    // const scrollContainerRef = useRef(null);
    // const postsStatus = useSelector(state => state.profile.userPosts.status);
    // const {pageNumber} = useSelector(state => state.profile.userPosts.obj.pageable.pageNumber);
    // const pageable = useSelector(state => state.profile.userPosts.obj.pageable);
    // const pageNumber = pageable ? pageable.pageNumber : 0;
    // const {totalPages} = useSelector(state => state.profile.userPosts.obj)
    // console.log(page);

    useEffect(() => {
        if (token) {
            console.log("USER TOKEN: ", token);
            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            setID(parseInt(decodedToken.sub));
        }
    }, [token]);

    useEffect(() => {
        if (id !== null) {
            getUser(id);
        }
    }, [id, editUserStatus, deleteStatus, urlID, token, sended])

    useEffect(() => {
        if (obj.user === "myUser") {
            dispatch(requests({page: 1 - 1}));
        }
    }, [obj.user]);

    const getUser = (userId) => {
        let newObj = {};
        if (userId === urlID) {
          newObj = {
            user: "myUser",
            id: urlID,
          };
        } else {
          newObj = {
            user: "anotherUser",
            id: urlID,
          };
        }
        dispatch(userProfile(newObj));
        dispatch(getFriends({userId: urlID}));
        dispatch(getUserPosts({page: 0, userId: urlID}))
        dispatch(getUserPostsContent({page: 0, userId: urlID}))
    };

    const modalEditProfileOpen = () => {
        dispatch(modalEditProfile(true));
    };

    const modalDeleteFriendOpen = () => {
        dispatch(friendData({id: urlID}));
        dispatch(modalDeleteFriend(true));
    };

    const clickSendRequest = () => {
        dispatch(sendFriendRequest({friendId: urlID}));
        setSended(true)
    };
    
    const downloadInputBackgroundPhoto = async (e) => {
        const file = e.target.files[0];
        const backPhoto = (await getPhoto(file)).data.url;
        let dataObj = {
            id: id,
            userObj: {photo: backPhoto},
        };
        dispatch(editUser(dataObj));
        dispatch(resetEditProfileState());
    };
    
    const downloadInputAvatar = async (e) => {
        const file = e.target.files[0];
        const avatarPhoto = (await getPhoto(file)).data.url;
        let dataObj = {
            id: id,
            userObj: {avatar: avatarPhoto},
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
        setLinkPosts("focus");
        setLinkFriends("unfocus");
        setLinkRequests("unfocus");
      };
    
    const clickLinkFriends = () => {
      setLinkPosts("unfocus");
      setLinkFriends("focus");
      setLinkRequests("unfocus");
    };
    const clickLinkRequests = () => {
      setLinkPosts("unfocus");
      setLinkFriends("unfocus");
      setLinkRequests("focus");
    };
    
    if (word === "profile" && linkPosts !== "focus") {
      clickLinkPosts();
    } else if (linkFriends !== "focus" && word === "friends") {
      clickLinkFriends();
    } else if (linkRequests !== "focus" && word === "requests") {
      clickLinkRequests();
    } else if (word !== "friends" && linkFriends === "focus") {
      clickLinkPosts();
    }

    // const getMorePosts = () => {
    //   if (postsStatus !== 'pending' && pageNumber < totalPages) {
    //     console.log("SCROLL");
    //     dispatch(getUserPosts({ page: pageNumber + 1, userId: urlID }));
    //   }
    // };
    
    // const handleScroll = createHandleScroll({
    //   scrollRef: scrollContainerRef,
    //   status: postsStatus,
    //   fetchMore: getMorePosts,
    // });
    
    
    return (
        <>
        {
            status === "rejected" ?
            <h1>Error: {error}</h1>
            :
            <>
            <DeleteFriendModal />
            <ModalEditProfile />
            <div style={{backgroundColor: "#F0F2F5"}} >
                <div className='profileImageWrapper'>
                      <div className="profileHeader__cover">
                          <img className="profileHeader__photo" src={obj.photo ? obj.photo : '/profilePage/default_background.jpg'} alt="header photo" />
                          {
                          obj.user === "myUser" ?
                          
                          <Button
                          variant="contained"
                          sx={{
                              right: "1%",
                              bottom: 0,
                              position: "absolute",
                              marginBottom: "20px",
                              backgroundColor: '#0866FF'
                          }}
                          onClick={clickInputBackgroundPhoto}
                          >
                              <CameraAltIcon />
                              <input type="file" style={{ display: "none" }} ref={inputBackgroundPhoto} onChange={(e) => downloadInputBackgroundPhoto(e)} />
                          </Button>
                          :
                          null
                          }
  
                          <div className="profileHeader__avatar">
                              <Avatar
                              alt="Avatar"
                              src={ obj.avatar ? obj.avatar : '/profilePage/l60Hf.png'}
                              sx={{
                                  width: "128px",
                                  height: "128px",
                                  border: '5px solid white',
                                  position: 'absolute',
                                  objectFit: "cover",
                                  '@media (min-width: 876px)': {
                                      width: "166px",
                                      height: "166px",
                                  }
                              }} 
                              />
                              {
                                  obj.user === "myUser" ?
                              
                              <Avatar 
                              sx={{
                                  right: "1%",
                                  top: "95px",
                                  position: "absolute",
                                  width: "35px",
                                  height: "35px",
                                  '@media (min-width: 876px)': {
                                      right: "-28%",
                                      top: "130px",
                                  }
                              }}
                              onClick={clickInputAvatar}
                              >
                                  <CameraAltIcon />
                                  <input type="file" style={{ display: "none" }} ref={inputAvatarPhoto} onChange={(e) => downloadInputAvatar(e)} />
                              </Avatar>
                              :
                              null
                              }
                          </div>
                      </div>
                    <Box sx={{backgroundColor: "white"}}>
                      <div className='profileHeader__profile'>
                          <div className='profileHeader__info'>
                              <div className='profileHeader__userInfo'>
                                  <Typography variant='h4' 
                                  sx={{
                                    color: "black", 
                                    fontWeight: 700, 
                                    '@media (min-width: 876px)': {
                                        mb: "70px",
                                    }
                                  }}
                                  >{obj.name} {obj.surname}</Typography>
                              </div>
                              <div className='profileHeader__buttons'>
                                  {
                                      obj.user === "myUser" ?
                                  
                                      <Button 
                                      variant="contained" 
                                      sx={{
                                        //   backgroundColor: '#0866FF',
                                        '@media (min-width: 876px)': {
                                            marginRight: '16px'
                                        }
                                      }}
                                      startIcon={<EditIcon />}
                                      onClick={modalEditProfileOpen}
                                      >
                                          Edit profile
                                      </Button>
                                      :
                                      <Box sx={{display: "flex", flexDirection: "column", gap: "7px"}}>
                                          {obj.status === "ACCEPTED" ?                                    
                                            <Button 
                                            color="error" 
                                            variant="contained"
                                            onClick={modalDeleteFriendOpen} 
                                            startIcon={<DeleteIcon />}
                                            >
                                                DELETE
                                            </Button>
                                            :
                                            (obj.user === "anotherUser" && obj.status === "NONE" ?
                                              <Button
                                              color="primary" 
                                              variant="contained"
                                              onClick={clickSendRequest}
                                              startIcon={<PersonAddRoundedIcon />} 
                                              >Send request
                                              </Button>
                                                
                                                :obj.status === "PENDING" ?
                                                <Button
                                                variant="contained"
                                                disabled
                                                >Sended
                                                </Button>
                                                :
                                                null
                                            )
                                          }
                                          <Button
                                          color="secondary" 
                                          variant="contained"
                                          startIcon={<SendRoundedIcon />} 
                                          >Message
                                          </Button>
                                      </Box>
                                  }
                              </div>
                          </div>
                      </div>
                      <ul className='profileNav'>
                          <li className={linkPosts === "unfocus" ? 'profileNav__link' : 'profileNav__link  profileNav__link--active'}  onClick={clickLinkPosts}>
                              <NavLink className='profileNav__item' to="">
                                  <Typography variant='subtitle1'>Posts</Typography>
                              </NavLink>
                          </li>
                          <li className={linkFriends === "unfocus" ? 'profileNav__link' : 'profileNav__link  profileNav__link--active'} onClick={clickLinkFriends}>
                              <NavLink className='profileNav__item' to="friends">
                                  <Typography variant='subtitle1'>Friends</Typography>
                              </NavLink>
                          </li>
                          {
                              obj.user === "myUser" &&
                              <li className={linkRequests === "unfocus" ? 'profileNav__link' : 'profileNav__link  profileNav__link--active'} onClick={clickLinkRequests}>
                                  <NavLink className='profileNav__item' to="requests">
                                      <Typography variant='subtitle1'>Requests</Typography>
                                  </NavLink>
                              </li>
                          }
                      </ul>
                    </Box>
                    <div style={{backgroundColor: "#F0F2F5", height: "100%", paddingTop: "20px"}}>
                            <Outlet />
                    </div>
                </div>
            </div>
            </>
        }
        </>
    )
}



