import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import PostMediaGrid from './PostMediaGrid';
import PostHeader from './PostHeader';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function PosdBodyRepost({ originalPostId, text }){
    const [postData, setPostData] = useState(null);

    const navigate = useNavigate();

    const handleCommentButtonClick = () => {
        navigate(`/post/${originalPostId}`);
    };

    useEffect(() => {
        fetch('../testPostData.json')
            .then(response => response.json())
            .then(data => {
            const post = data.find(post => post.postId === originalPostId);
            setPostData(post);
            })
            .catch(error => console.error('Error fetching data:', error));
        }, [originalPostId]);

    if (!postData) {
        return null;
    }

    return(
        <div className="postComponent_body">
            <Typography variant="body1" gutterBottom className='postComponent_body_text' style={{ paddingLeft: '5px' }}>
                {text}
            </Typography>
            <Paper onClick={handleCommentButtonClick}>
                <PostMediaGrid   
                    media={postData.media}
                />
                <PostHeader
                    userData={postData.user}
                    date={postData.date}
                    isRepost= {true}
                ></PostHeader>
                <Typography variant="body1" gutterBottom className='postComponent_body_text' style={{ paddingLeft: '5px' }}>
                    {postData.text}
                </Typography>
            </Paper>
        </div>
    )
}

PosdBodyRepost.propTypes = {
    originalPostId: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
};