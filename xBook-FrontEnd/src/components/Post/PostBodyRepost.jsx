// import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import PostMediaGrid from './PostMediaGrid';
import PostHeader from './PostHeader';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import './Posts.scss'

export default function PosdBodyRepost({ originalPost, text}){

    const navigate = useNavigate();

    const handleCommentButtonClick = () => {
        navigate(`/post/${originalPost.id}`);
    };
    return(
        <div className="postComponent_body">
            <Typography variant="body1" gutterBottom className='postComponent_body_text' style={{ paddingLeft: '5px' }}>
                {text}
            </Typography>
            <Paper onClick={handleCommentButtonClick}>
                <PostMediaGrid   
                    media={[originalPost.media]}
                />
                <PostHeader
                    author={originalPost.author}
                    date={originalPost.createdDate}
                    isRepost= {true}
                ></PostHeader>
                <Typography variant="body1" gutterBottom className='postComponent_body_text' style={{ paddingLeft: '5px' }}>
                    {originalPost.text}
                </Typography>
            </Paper>
        </div>
    )
}

PosdBodyRepost.propTypes = {
    originalPost: PropTypes.object,
    text: PropTypes.string,
};