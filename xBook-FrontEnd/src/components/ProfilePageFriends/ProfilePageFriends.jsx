import './ProfilePageFriends.scss'
import Typography from '@mui/material/Typography';
import ProfileFriendCard from '../ProfileFriendCard/ProfileFriendCard';
import { Box, Pagination } from '@mui/material';
import { getFriends } from '../../redux/friends/friendsThunks';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function ProfilePageFriends() {
    
    let urlID = useParams().id;
    urlID = parseInt(urlID);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFriends({userId: urlID}));
    }, [urlID]);

    const content = useSelector(state => state.friends.getFriends.obj.content);
    const totalPages = useSelector(state => state.friends.getFriends.obj?.totalPages);
    const pageNumber = useSelector(state => state.friends.getFriends.obj.pageable?.pageNumber);

    const handlePaginationClick = (event, page) => {
        dispatch(getFriends({ userId: urlID, page: page - 1 }));
    }

    return (
        <div className='profileFriends'>
            <Box
            sx={{
                '@media (min-width: 699px)': {
                    display: "flex",
                    justifyContent: "space-between"
                },
            }}>
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
                content && content.length !== 0 ?
                <> 
                    <ul className='friendsList'>
                        {content.map(friend => (
                            <li key={friend.id}>
                                <ProfileFriendCard friend={friend} />
                            </li>
                        ))}
                    </ul>
                    <Pagination 
                    count={totalPages} 
                    page={pageNumber + 1} 
                    color="primary" 
                    sx={{marginTop: "30px"}}
                    onChange={handlePaginationClick}
                    />
                </>
                :
                <Typography variant='h5'sx={{my: "100px", alignSelf: "center"}}>
                    <Box sx={{color: "text.secondary", textTransform: "uppercase"}}>NO FRIENDS</Box>
                </Typography>
            }

        </div>
    )
}