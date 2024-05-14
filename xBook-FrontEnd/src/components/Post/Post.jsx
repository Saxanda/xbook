import PropTypes from 'prop-types';
import PostBody from "./PostBody"
import PosdBodyRepost from './PostBodyRepost';
import PostFooter from "./PostFooter"
import PostHeader from "./PostHeader"
import Paper from '@mui/material/Paper';

export default function Post({ postData, postComments }){
    if (!postData) {
        return null;
    }
    const { postWithRepost } = postData;
    
    return(
        <Paper elevation={3} className='postComponent' >
            <PostHeader 
                userData={postData.user}
                date={postData.date}
            />
            {postWithRepost ? (
                <PosdBodyRepost
                    originalPostId={postData.originalPostId}
                    text={postData.text}  
                />
            ) : (
                <PostBody   
                    text={postData.text}    
                    media={postData.media}
                />
            )}
            <PostFooter
                likes={postData.likes} 
                comments={postData.commentsCount}
                reposts={postData.reposts}
                postId={postData.postId}
                originalPostId={postData.originalPostId}
            />
            {postComments}
        </Paper>
        
    )
}

Post.propTypes = {
    postData: PropTypes.shape({
        user: PropTypes.object.isRequired,
        text: PropTypes.string.isRequired,
        postWithRepost: PropTypes.bool.isRequired,
        originalPostId: PropTypes.number.isRequired,
        media: PropTypes.shape({
            images: PropTypes.arrayOf(PropTypes.string).isRequired,
        }).isRequired,
        likes: PropTypes.number.isRequired,
        comments: PropTypes.arrayOf(
            PropTypes.shape({
                user: PropTypes.object.isRequired,
                text: PropTypes.string.isRequired
            })
        ).isRequired,
        date: PropTypes.string.isRequired,
        commentsCount : PropTypes.number.isRequired,
        reposts : PropTypes.number.isRequired,
        postId : PropTypes.number.isRequired,
    }),
    postComments: PropTypes.node
};

