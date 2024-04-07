import PropTypes from 'prop-types';
import PostBody from "./PostBody"
import PostFooter from "./PostFooter"
import PostHeader from "./PostHeader"

export default function Post({ postData }){

    return(
        <div className="postComponent">
            <PostHeader 
                userData={postData.user}
                date={postData.date}
            >
            </PostHeader>
            <PostBody   
                text={postData.text}    
                media={postData.media}>
            </PostBody>
            <PostFooter
                likes={postData.likes} 
                comments={postData.commentsCount}
                reposts={postData.reposts}
            >  
            </PostFooter>
        </div>
    )
}

Post.propTypes = {
    postData: PropTypes.shape({
        user: PropTypes.object.isRequired,
        text: PropTypes.string.isRequired,
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
    }).isRequired
};

