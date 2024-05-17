import { useState } from 'react';
import { Avatar, Button, Paper } from '@mui/material';
import CreatePostModal from './CreatePostModal'; // переконайтеся, що шлях правильний

export default function CreatePost() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Paper style={{ width: '100%', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: "border-box", gap: "10px" }}>
                <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpen}
                    style={{ width: "100%", backgroundColor: 'rgba(173, 173, 173, 0.3)', textAlign: 'left' }}
                >
                    Що у вас на думці?
                </Button>
            </Paper>

            <CreatePostModal open={open} handleClose={handleClose} />
        </>
    );
}