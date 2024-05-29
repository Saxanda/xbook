import { getUserIsLogin } from "../postApi";
import { Typography, Avatar, CircularProgress } from '@mui/material';
import { useEffect, useState } from "react";

export default function AuthorInfo() {
    const [author, setAuthor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const uzer = await getUserIsLogin();
                setAuthor(uzer);
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
        return <Typography color="error">Error fetching user information</Typography>;
    }

    if (!author) {
        return null; 
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <Avatar alt="User Avatar" src={author.avatar} />
            <Typography style={{ marginLeft: '10px' }}>
                {author.name} {author.surname}
            </Typography>
        </div>
    );
}