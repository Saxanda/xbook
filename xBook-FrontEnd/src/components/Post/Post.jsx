import PropTypes from 'prop-types';
import PostBody from "./PostBody";
import PosdBodyRepost from './PostBodyRepost';
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import Paper from '@mui/material/Paper';

export default function Post({ postData, postComments, refresh, isPage, addToBookmarks, removeFromBookmarks, deleteBookmark, bookmarkId }) {
    if (!postData) {
        return null;
    }

    return (
        <Paper elevation={3} className='postComponent' margin={"5px"}>
            <PostHeader 
                author={postData.author}
                date={postData.createdDate}
                isPage={isPage}
                postId={postData.id}
                refresh={refresh}
            />
            {postData.type === 'REPOST' ? (
                <PosdBodyRepost
                    originalPost={postData.originalPost}
                    text={postData.body}  
                />
            ) : (
                <PostBody   
                    text={postData.body}    
                    media={[postData.media]}
                />
            )}
            <PostFooter
                likes={postData.likesCount} 
                comments={postData.commentsCount}
                reposts={postData.repostsCount}
                id={postData.id}
                originalPost={postData.originalPost}
                refresh={refresh}
                isLiked={postData.liked}
                bookmarked={postData.bookmarked}
                addToBookmarks={addToBookmarks}
                removeFromBookmarks={removeFromBookmarks}
                deleteBookmark={deleteBookmark}
                bookmarkId={bookmarkId}  
            />
            {postComments}
        </Paper>
    );
}

Post.propTypes = {
    postData: PropTypes.object.isRequired,
    postComments: PropTypes.node,
    refresh: PropTypes.func,
    isPage: PropTypes.bool,
    addToBookmarks: PropTypes.func,
    removeFromBookmarks: PropTypes.func,
    deleteBookmark: PropTypes.func,
    bookmarkId: PropTypes.string, 
};
