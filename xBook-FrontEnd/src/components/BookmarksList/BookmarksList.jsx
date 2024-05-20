import { useState, useEffect } from 'react';
import './BookmarksList.scss';
import axios from 'axios';

const BookmarksList = ({ bookmarks, deleteBookmark, getAuthToken, userId }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = getAuthToken();
                // console.log(postId);
                const response = await axios.get(`http://localhost:8080/api/v1/posts/post/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }});
                    setPosts(response.data);
                // const data = await response.json();
                setPosts(response.data)
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [getAuthToken, userId]);

    return (
        <div className='bookmarkslist'>
            <h3>All bookmarks</h3>
            
            {bookmarks.map(bookmark => {
                const post = posts.find(post => post.postId === bookmark.postId);
                return (
                    <div key={bookmark.postId}>
                        <h4>{post}</h4>
                        
                        <button onClick={() => deleteBookmark(bookmark.bookmarkId)}>Delete</button>
                    </div>
                );
            })}
        </div>
    );
};

export default BookmarksList;
