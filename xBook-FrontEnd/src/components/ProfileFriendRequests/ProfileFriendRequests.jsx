import './ProfileFriendRequests.scss'
import Typography from '@mui/material/Typography';
import { Box, Pagination } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import ProfileRequestCard from '../ProfileRequestCard/ProfileRequestCard';
import { useEffect } from 'react';
import { requests } from '../../redux/friends/friendsThunks';
import { useParams } from 'react-router-dom';

export default function ProfileFriendRequests() {
    let urlID = useParams().id;
    urlID = parseInt(urlID);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(requests());
    }, []);


    const content = useSelector(state => state.friends.requestsToMe.obj?.content);
    const totalPages = useSelector(state => state.friends.requestsToMe.obj?.totalPages);
    const pageNumber = useSelector(state => state.friends.requestsToMe.obj.pageable?.pageNumber);

    const handlePaginationClick = (event, page) => {
        dispatch(requests({ page: page - 1 }));
    }

    return (
        <div className='profileRequests'>
            <Box
            sx={{
                '@media (min-width: 699px)': {
                    display: "flex",
                    justifyContent: "space-between"
                },
            }}>
                <Typography variant='h6' sx={{ fontWeight: 600 }}>Requests</Typography>
            </Box>
            {
                content && content.length !== 0 ?
            <Box sx={{display: "flex", flexDirection: "column", marginTop: "20px"}}>            
                <ul className='requestsList'>
                    {content.map(friend => (
                        <li className='requestList__item' key={friend.id}>
                            <ProfileRequestCard friend={friend} />
                        </li>
                    ))}
                </ul>
                {
                    totalPages > 1 ?
                    <Pagination 
                    count={totalPages} 
                    page={pageNumber + 1} 
                    color="primary" 
                    sx={{marginTop: "30px", alignSelf: "center"}}
                    onChange={handlePaginationClick}
                    />
                    :
                    null    
                }
            </Box>
            :
            <Typography variant='h5'sx={{my: "100px", alignSelf: "center"}}>
                <Box sx={{color: "text.secondary", textTransform: "uppercase"}}>No requests</Box>
            </Typography>
            }
            
        </div>
    )
}