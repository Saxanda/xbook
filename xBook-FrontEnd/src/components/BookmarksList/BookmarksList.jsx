import { useState, useEffect } from 'react';
import Post from '../Post/Post';
import { getPosts } from '../Post/postApi';
import './BookmarksList.scss'


const BookmarksList = ({ bookmarks, deleteBookmark,}) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
        try {
            const data = await getPosts();
            setPosts(data.content);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
        };


        fetchData();
    },[]);
    console.log(bookmarks);
    console.log(posts);
    
    const bookmarksIds = new Set();
    bookmarks.forEach((bookmark) => bookmarksIds.add(bookmark.bookmarkId));
    
    const uniqueBookmarks = bookmarks.filter(bookmark => bookmarksIds.has(bookmark.bookmarkId));


    return (
        <div>
            <h1 className='bookmarksTitle'>All bookmarks</h1>
            {Array.isArray(bookmarks) && uniqueBookmarks.map(bookmark => {
                const post = posts.find(post => post.id === bookmark.postId);
                return (
                    <div className='content' key={bookmark.postId}>
                        {post ? (
                            <Post
                                postData={post}
                                postComments={null}
                                refresh={() => {}}
                                addToBookmarks={()=>{}}
                            />
                        ) : (
                            <p>Loading post...</p>
                        )}
                        <button className='buttonBookmarks' onClick={() => deleteBookmark(bookmark.bookmarkId)}>Delete</button>
                    </div>
                    
                );
                
            })}
            
        </div>
    );
};

export default BookmarksList;
