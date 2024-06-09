import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import PostMediaGrid from './PostMediaGrid';

export default function PostBody({ text, media }) { 
    return (
        <div className="postComponent_body" style={{ maxWidth: '100%', width:"100%" }}>
            <Typography variant="body1" gutterBottom className='postComponent_body_text' style={{ paddingLeft: '5px' }}>
                {text}
            </Typography>
            <PostMediaGrid media={media} />
        </div>
    );
}

PostBody.propTypes = {
    text: PropTypes.string.isRequired,
    media: PropTypes.arrayOf(PropTypes.string).isRequired
};