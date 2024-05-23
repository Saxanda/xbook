import { useState, useEffect } from 'react';
import Bookmarks from '../components/Bookmarks/Bookmarks';
import {jwtDecode} from 'jwt-decode';

export default function BookmarkPage() {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        
        if (token) {
            const decodedToken = jwtDecode(token);
            const userIdFromToken = decodedToken.sub || decodedToken.id;
            
            setUserId(userIdFromToken);
        }
    }, []);

    return (
        <div>
            <Bookmarks userId={userId} />
        </div>
    );
}
