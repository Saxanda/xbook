import PropTypes from 'prop-types';
import PostBody from "./PostBody"
import PosdBodyRepost from './PostBodyRepost';
import PostFooter from "./PostFooter"
// import PostHeader from "./PostHeader"
import Paper from '@mui/material/Paper';

export default function Post({ postData, postComments }){
    if (!postData) {
        return null;
    }
    return(
        <Paper elevation={3} className='postComponent' >
            {/* <PostHeader 
                userData={postData.user}
                date={postData.date}
            /> */}
            {postData.type === 'REPOST' ? (
                <PosdBodyRepost
                    // originalPostId={postData.originalPostId}
                    text={postData.body}  
                />
                ) : (
                    <PostBody   
                        text={postData.body}    
                        media={[postData.media]}
                    />
                )}
                <PostFooter
                    likes={postData.likes} 
                    // comments={postData.commentsCount}
                    // reposts={postData.reposts}
                    id={postData.id}
                    // originalPostId={postData.originalPostId}
                />
                {postComments}
        </Paper>
        
    )
}

Post.propTypes = {
    postData: PropTypes.shape({
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        media: PropTypes.string,
        type: PropTypes.oneOf(['ORIGINAL', 'REPOST']).isRequired,
        likes: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
    }).isRequired,
    postComments: PropTypes.node
};

