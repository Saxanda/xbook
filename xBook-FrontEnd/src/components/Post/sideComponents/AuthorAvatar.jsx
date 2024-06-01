import { getUserIsLogin } from "../postApi";
import { Avatar, CircularProgress } from '@mui/material';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthorAvatar() {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [userId, setUserId] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const redirectToProfile = () => {
        navigate(`/profile/${userId}`);
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUserIsLogin();
                setAvatarUrl(user.avatar);
                setUserId(user.id)
            } catch (error) {
                console.error('Error fetching user:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return null; 
    }

    
    return (
        <Avatar alt="User Avatar" src={avatarUrl} onClick={redirectToProfile}/>
    );
}