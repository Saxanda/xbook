import { useState } from 'react';
import { Avatar, Button, Paper } from '@mui/material';
import CreatePostModal from './CreatePostModal';
import PropTypes from 'prop-types';

export default function CreatePost({onPostCreated}) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    

    return (
        <>
            <Paper style={{ width: '100%', marginTop: "20px" , padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: "border-box", gap: "10px" }}>
                <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpen}
                    style={{ width: "100%", backgroundColor: 'rgba(173, 173, 173, 0.5)', textAlign: 'left' }}
                >
                    What's on your mind?
                </Button>
            </Paper>

            <CreatePostModal open={open} handleClose={handleClose} onPostCreated={onPostCreated} />
        </>
    );
}


CreatePost.propTypes = {
    onPostCreated: PropTypes.func
};