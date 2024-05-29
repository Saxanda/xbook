import { getUserIsLogin } from "../postApi";
import { Avatar, CircularProgress } from '@mui/material';
import { useEffect, useState } from "react";

export default function AuthorAvatar() {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUserIsLogin();
                setAvatarUrl(user.avatar);
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
    <Avatar alt="User Avatar" src={avatarUrl} />
    );
}