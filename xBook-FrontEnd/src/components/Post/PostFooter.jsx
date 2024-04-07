import PropTypes from 'prop-types';

export default function PostFooter({ likes, comments }) {
    return (
        <div className="postComponent_footer">
            <div className="postComponent_footer_activiti">
                <div className="postComponent_footer_activiti_info">
                    <p>Likes: {likes}</p>
                    <p>Коментарі: {comments.length}</p>
                </div>
                <div className="postComponent_footer_activiti_btns">
                    <button>Like</button>
                    <button>Comment</button>
                </div>
            </div>
            <div className="postComponent_footer_comments">
                {comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <p>By: {comment.user.fullName}</p>
                        <p>{comment.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

PostFooter.propTypes = {
    likes: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            user: PropTypes.shape({
                username: PropTypes.string.isRequired,
                avatar: PropTypes.string.isRequired,
                fullName: PropTypes.string.isRequired
            }).isRequired,
            text: PropTypes.string.isRequired
        })
    ).isRequired
};
