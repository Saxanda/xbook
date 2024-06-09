import './ProfileFriendRequests.scss';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import ProfileRequestCard from '../ProfileRequestCard/ProfileRequestCard';
import { useEffect, useState } from 'react';
import { requests } from '../../redux/friends/friendsThunks';
import { useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import CircularProgress from '@mui/material/CircularProgress';

export default function ProfileFriendRequests() {
    let urlID = useParams().id;
    urlID = parseInt(urlID);

    const userId = useSelector(state => state.profile.profileData.obj.id);

    const dispatch = useDispatch();

    const [requestsData, setRequestsData] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchInitialRequests = async () => {
            try {
                const response = await dispatch(requests({ userId: urlID, page: 0 }));
                const data = response.payload;
                setRequestsData(data.content);
                setPage(1);
                setHasMore(!data.last);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchInitialRequests();
    }, [urlID]);

    const handlePagination = async () => {
        if (!hasMore) return;
        try {
            const response = await dispatch(requests({ userId: urlID, page: page }));
            const data = response.payload;
            setRequestsData(prevRequests => [...prevRequests, ...data.content]);
            setPage(prevPage => prevPage + 1);
            setHasMore(!data.last);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const handleActionComplete = (id) => {
        setRequestsData(prevRequests => prevRequests.filter(friend => friend.id !== id));
    };

    return (
        <div className='profileRequests'>
            <Box
                sx={{
                    '@media (min-width: 699px)': {
                        display: "flex",
                        justifyContent: "space-between"
                    },
                }}
            >
                <Typography variant='h6' sx={{ fontWeight: 600 }}>Requests</Typography>
            </Box>
            {
                requestsData.length > 0 ?
                    <InfiniteScroll
                        style={{ marginTop: "20px" }}
                        dataLength={requestsData.length}
                        next={handlePagination}
                        hasMore={hasMore}
                        loader={
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 0 10px 0" }}>
                                <CircularProgress />
                            </div>
                        }
                    >
                        <ul className='requestsList'>
                            {requestsData.map(friend => (
                                <li className='requestList__item' key={friend.id}>
                                    <ProfileRequestCard friend={friend} onActionComplete={handleActionComplete} />
                                </li>
                            ))}
                        </ul>
                    </InfiniteScroll>
                    :
                    <Typography variant='h5' sx={{ my: "100px", alignSelf: "center" }}>
                        <Box sx={{ color: "text.secondary", textTransform: "uppercase" }}>No requests</Box>
                    </Typography>
            }
        </div>
    );
}
