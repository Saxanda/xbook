import { useState, useEffect } from 'react';
import Post from '../Post/Post';
import { getPosts } from '../Post/postApi';
import './BookmarksList.scss'

const BookmarksList = ({ bookmarks, deleteBookmark }) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchData = async (page) => {
        try {
            setLoading(true);
            const data = await getPosts(page);
            setPosts(prevPosts => [...prevPosts, ...data.content]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
                setPage(prevPage => prevPage + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    const bookmarksIds = new Set();
    bookmarks.forEach((bookmark) => bookmarksIds.add(bookmark.bookmarkId));

    const uniqueBookmarks = bookmarks.filter(bookmark => bookmarksIds.has(bookmark.bookmarkId));

    return (
        <div>
            {Array.isArray(bookmarks) && bookmarks.length === 0 && (
                <h1 className='bookmarksTitle'>No saved objects</h1>
            )}
            {Array.isArray(bookmarks) && uniqueBookmarks.map(bookmark => {
                const post = posts.find(post => post.id === bookmark.postId);
                return (
                    <div className="content" key={bookmark.postId}>
                        {post ? (
                            <Post
                                postData={post}
                                postComments={null}
                                refresh={() => {}}
                                addToBookmarks={() => {}}
                                removeFromBookmarks={() => { deleteBookmark(bookmark.postId) }}
                            />
                        ) : (
                            <></> 
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default BookmarksList;
