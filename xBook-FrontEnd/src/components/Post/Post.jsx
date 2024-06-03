
import PropTypes from 'prop-types';
import PostBody from "./PostBody";
import PosdBodyRepost from './PostBodyRepost';
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import Paper from '@mui/material/Paper';

export default function Post({ postData, postComments, refresh, isPage, addToBookmarks }){

    if (!postData) {
        return null;
    }

    return (
        <Paper elevation={3} className='postComponent'>
            <PostHeader 
                author={postData.author}
                date={postData.createdDate}
                isPage={isPage}
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
                    refresh ={refresh}
                    isLiked={postData.liked}
                    addToBookmarks={addToBookmarks}
                />
            
            {postComments}
        </Paper>
    );
}

Post.propTypes = {
    postData: PropTypes.object.isRequired,
    postComments: PropTypes.node,
    refresh: PropTypes.func,
    isPage:PropTypes.bool,
    addToBookmarks: PropTypes.func.isRequired 
};
