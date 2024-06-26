import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Typography , Box } from '@mui/material';
import { getUserById } from './postApi';
import { useNavigate } from 'react-router-dom';

export default function Comment({ comment }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserById(comment.author.id);
                setUser(userData);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [comment.userId]);
    const redirectToProfile = () => {
        navigate(`/profile/${user.id}`);
    };
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error loading user data: {error.message}</div>;
    }
    return (
        <div className="comment">
            <Avatar src={user.avatar} alt={user.name} onClick = {redirectToProfile}/>
            <Box sx={{ ml: 2 }} className="comment-body">
                <Typography variant="subtitle1" fontWeight="bold">{user.name} {user.surname}</Typography>
                <Typography variant="body1">{comment.content}</Typography>
            </Box>
        </div>
    );
}

Comment.propTypes = {
    comment: PropTypes.object       
};