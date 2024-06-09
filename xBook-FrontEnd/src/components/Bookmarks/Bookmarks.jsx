
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Bookmarks.scss'
import BookmarksList from '../BookmarksList/BookmarksList'
import NavigationSideBar from '../UpdateNavigations/NavigationSideBar'
import API_BASE_URL from '../../helpers/apiConfig';
const Bookmarks = ({ userId }) => {
    const [bookmarks, setBookmarks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");

    const fetchBookmarks = async () => {
        try {
            const token = getAuthToken();
            const response = await axios.get(`${API_BASE_URL}/api/v1/bookmarks/user/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setBookmarks(response.data.content);
            localStorage.setItem('bookmarks', JSON.stringify(response.data));
        } catch (error) {
            console.error('Error fetching bookmarks:', error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchBookmarks();
        }
    }, [userId]);

   

    const deleteBookmark = async (postId) => {
        try {
            
            const token = getAuthToken();

            await axios.delete(`${API_BASE_URL}/api/v1/bookmarks/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setBookmarks(prevBookmarks => prevBookmarks.filter(bookmark => bookmark.postId !== postId));
        } catch (error) {
            console.error('Error deleting bookmark:', error);
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const filteredBookmarks = selectedCategory === "all" ? bookmarks : bookmarks.filter(bookmark => bookmark.category === selectedCategory);

    const getAuthToken = () => {
        return sessionStorage.getItem('token') || localStorage.getItem('token');
    };

    return (
        <div className="container" style={{ display: 'flex' }}>

            <div className='navigationSideBarBookmarks'>
            <NavigationSideBar onCategoryClick={handleCategoryClick} />
            </div>
            <div className='Bookmarks'>
            <BookmarksList bookmarks={filteredBookmarks} deleteBookmark={deleteBookmark} getAuthToken={getAuthToken} userId={userId}/>               
            </div>
        </div>
    );
};

export default Bookmarks;




