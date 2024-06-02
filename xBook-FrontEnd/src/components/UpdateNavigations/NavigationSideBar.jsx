import { useEffect, useState } from 'react';

import { Button, Divider, List , Typography, Box, Stack, Hidden   } from '@mui/material';
import { Notifications, Chat, Bookmarks, Search, People } from '@mui/icons-material';
import AuthorProfileNav from "./AuthorProfileNav";
import { getFriends } from '../Post/postApi';
import SideBarFriendItem from './SideBarFriendItem';

import './Sidbars.scss';

import { useNavigate } from 'react-router-dom';


export default function NavigationSideBar(){
    const navigate = useNavigate();

    const [friends, setFriends] = useState([]);
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const friendsData = await getFriends();
                setFriends(friendsData.content);
            } catch (error) {
                console.error('Error fetching :', error);
            }
        };

        fetchFriends();
    }, []);


    return(
        <Hidden mdDown>
            <Box className="home_sidebar_container" marginLeft={"15px"}>
                <AuthorProfileNav />
                
                <Box className="nav_buttons" mt={2}>
                    <Stack spacing={2}>
                        <Button onClick={() => navigate('/notifications')} color="inherit" sx={{ paddingLeft: '35px', justifyContent: 'flex-start' }}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Notifications />
                                <span>Notifications</span>
                            </Stack>
                        </Button>
                        <Button onClick={() => navigate('/chats')} color="inherit" sx={{ paddingLeft: '35px', justifyContent: 'flex-start' }}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Chat />
                                <span>Chats</span>
                            </Stack>
                        </Button>
                        <Button onClick={() => navigate('/bookmarks')} color="inherit" sx={{ paddingLeft: '35px', justifyContent: 'flex-start' }}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Bookmarks />
                                <span>Bookmarks</span>
                            </Stack>
                        </Button>
                        <Button color="inherit" disabled sx={{ paddingLeft: '35px', justifyContent: 'flex-start' }}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Search />
                                <span>Search</span>
                            </Stack>
                        </Button>
                        <Button color="inherit" disabled sx={{ paddingLeft: '35px', justifyContent: 'flex-start' }}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <People />
                                <span>Friends</span>
                            </Stack>
                        </Button>
                    </Stack>
                </Box>
                
                <Divider className="divider" my={2} />
                
                <Box className="friends_list" mt={2}>
                    <Typography variant="h6">Friends</Typography>
                        <List>
                            {friends.map(friend => (
                                <SideBarFriendItem key={friend.id} friendData={friend} />
                            ))}
                        </List>
                </Box>
                
                <Button variant="outlined" fullWidth className="view_all_friends" mt={2}>
                    View All Friends
                </Button>
            </Box>
        </Hidden>
        
    )
}