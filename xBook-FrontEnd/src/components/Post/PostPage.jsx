import PropTypes from 'prop-types';
import Post from "./Post";
import Paper from '@mui/material/Paper';
import { useParams } from 'react-router-dom';
import PostComments from './PostComments';

export default function PostPage({postData}) {
    
    let { postId } = useParams();
    const post = postData.find(post => post.postId === parseInt(postId));

    return (
        <div className='postPage'>
        {post && (
            <Paper style={{ height: '90vh', overflowY: 'scroll' }}>
                <Post
                    postData={post} 
                    postComments={<PostComments comments={post.comments} />} 
                />
            </Paper>
        )}
    </div>
    );
}

PostPage.propTypes = {
    postData: PropTypes.arrayOf(
        PropTypes.shape({
            user: PropTypes.shape({
                username: PropTypes.string.isRequired,
                avatar: PropTypes.string.isRequired,
                fullName: PropTypes.string.isRequired
            }).isRequired,
            text: PropTypes.string.isRequired,
            media: PropTypes.arrayOf(PropTypes.string).isRequired,
            likes: PropTypes.number.isRequired,
            reposts: PropTypes.number.isRequired,
            commentsCount: PropTypes.number.isRequired,
            comments: PropTypes.arrayOf(
                PropTypes.shape({
                    user: PropTypes.shape({
                        username: PropTypes.string.isRequired,
                        avatar: PropTypes.string.isRequired,
                        fullName: PropTypes.string.isRequired
                    }).isRequired,
                    text: PropTypes.string.isRequired
                })
            ).isRequired,
            date: PropTypes.string.isRequired,
            postId: PropTypes.number.isRequired
        })
    )
};