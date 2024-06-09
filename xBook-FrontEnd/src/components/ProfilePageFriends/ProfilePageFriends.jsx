import './ProfilePageFriends.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';
import ProfileFriendCard from '../ProfileFriendCard/ProfileFriendCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';
import { getFriends, deleteFriend, friendData } from '../../redux/friends/friendsThunks';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import DeleteFriendModal from '../ModalDeleteFriend/DeleteFriendModal';
import { modalDeleteFriend } from '../../redux/friends/friendsSlice';

export default function ProfilePageFriends() {
    let urlID = useParams().id;
    urlID = parseInt(urlID);

    const dispatch = useDispatch();

    const modalDeleteFriendState = useSelector((state) => state.friends.modalDeleteFriend) 

    const [friendsData, setFriendsData] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [friendToDelete, setFriendToDelete] = useState(null);
    const [friendsPage, setFriendsPage] = useState(false);

    useEffect(() => {
        const fetchInitialFriends = async () => {
            try {
                const response = await dispatch(getFriends({ userId: urlID, page: 0 }));
                const data = response.payload;
                setFriendsData(data.content);
                setPage(1);
                setHasMore(!data.last);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchInitialFriends();
    }, [urlID]);

    const handlePagination = async () => {
        if (!hasMore) return;
        try {
            const response = await dispatch(getFriends({ userId: urlID, page: page }));
            const data = response.payload;
            setFriendsData(prevFriends => [...prevFriends, ...data.content]);
            setPage(prevPage => prevPage + 1);
            setHasMore(!data.last);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };

    const handleDeleteFriend = async (friendId) => {
        try {
            console.log("ON DELETE");
            await dispatch(deleteFriend({ friendId }));
            await setFriendsData(prevFriends => prevFriends.filter(friend => friend.id !== friendId));
            await dispatch(modalDeleteFriend(false))
        } catch (error) {
            console.error('Error deleting friend:', error);
        }
    };

    const openDeleteModal = async (friend) => {
        await setFriendToDelete(friend);
        await dispatch(friendData({ id: friend.id }));
        await setFriendsPage(true)
        await dispatch(modalDeleteFriend(true))
    };

    const closeDeleteModal = async () => {
        await dispatch(modalDeleteFriend(false))
        await setFriendsPage(false)
    };

    return (
        <div className='profileFriends'>
            <Box
                sx={{
                    '@media (min-width: 699px)': {
                        display: "flex",
                        justifyContent: "space-between"
                    },
                }}
            >
                <Typography variant='h6' sx={{ fontWeight: 600 }}>Friends</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: "column",
                        gap: "5px",
                        '@media (min-width: 425px)': {
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }
                    }}
                >
                </Box>
            </Box>
            {
                friendsData.length > 0 ?
                    <InfiniteScroll
                        style={{ marginTop: "20px" }}
                        dataLength={friendsData.length}
                        next={handlePagination}
                        hasMore={hasMore}
                        loader={
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 0 10px 0" }}>
                                <CircularProgress />
                            </div>
                        }
                    >
                        <ul className='friendsList'>
                            {friendsData.map(friend => (
                                <li key={friend.id}>
                                    <ProfileFriendCard friend={friend} onDelete={() => openDeleteModal(friend)} />
                                </li>
                            ))}
                        </ul>
                    </InfiniteScroll>
                    :
                    <Typography variant='h5' sx={{ my: "100px", alignSelf: "center" }}>
                        <Box sx={{ color: "text.secondary", textTransform: "uppercase" }}>NO FRIEND</Box>
                    </Typography>
            }
            {friendToDelete && (
                <DeleteFriendModal
                    open={modalDeleteFriendState }
                    onClose={closeDeleteModal}
                    onDelete={() => handleDeleteFriend(friendToDelete.id)}
                    friend={friendToDelete}
                    friendsPage={friendsPage}
                    setFriendsPage={setFriendsPage}
                />
            )}
        </div>
    );
}
