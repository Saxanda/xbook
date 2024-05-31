import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import { deletePost } from './postApi';

import './Posts.scss'

export default function PostHeader({ author, date, isRepost, isPage,postId, refresh}) {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userIdFromToken = decodedToken.sub;
            setUserId(userIdFromToken);
        }
    }, [])

const formatDate = (data) => {
    const date = new Date(data);
    return format(date, 'EEEE, MMMM do, yyyy, hh:mm:ss a');
};
const navigate = useNavigate(); 
const handleBack = () => {
navigate(-1); 
};
const redirectToProfile = () => {
    navigate(`/profile/${author.id}`);
};
const handleDeletePost = async () => {
    console.log(postId);
    const result = await deletePost(postId);
    console.log('post deleted:', result);
    refresh();
};

    return (
        <div className="postComponent_header">
            <div className="postComponent_header_userinfo">
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={author.avatar} alt="User Avatar" onClick={redirectToProfile}/>
                    <div>
                        <Typography variant="h6">{author.name} {author.surname}</Typography>
                        <Typography variant="body2" color="textSecondary">{formatDate(date)}</Typography>
                    </div>
                </Stack>
            </div>
            
            { !isRepost && (
                <div className="postComponent_header_btns">
                    {author.id == userId && (
                    <IconButton variant="contained" aria-label="delete" onClick={handleDeletePost}>
                        <DeleteIcon />
                    </IconButton>
                    )}
                    {isPage && (
                        <IconButton variant="contained" aria-label="close" onClick={handleBack}>
                        <CloseIcon />
                        </IconButton>
                    )}
                </div>
            )}
            
        </div>
    );
}

PostHeader.propTypes = {
    author: PropTypes.object,
    date: PropTypes.string.isRequired,
    isRepost:PropTypes.bool,
    isPage:PropTypes.bool,
    postId:PropTypes.number,
    refresh:PropTypes.func
};