import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Paper, Typography, IconButton,TextField,Button,Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createPost } from './postApi';
// import { getUserIsLogin } from './postApi';
import AuthorInfo from './sideComponents/AuthorInfo';

export default function CreateRepostModal({ open, handleClose, postId, refresh }){
    const [newText, setNewText] = useState('');

    const handleTextChange = (event) => {
        setNewText(event.target.value);
    };
    const publish = async () =>{
        const postData = {
            title: "",
            body: newText ,
            media: "",
            type:"REPOST",
        };
        try {
            console.log(postId);
            const response = await createPost(postData,postId);
            console.log('Post created successfully:', response);
            console.log('Post Data:', postData);
            handleClose();
            setNewText('')
            refresh()
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }
    const close = () =>{
        handleClose();
        setNewText('');
    }

    return (
        <Modal open={open} onClose={close}>
            <Paper
                elevation={3}
                className='createPost_modal'
            >
                <Box className="createPost_modal_header">
                    <Typography variant="h5" gutterBottom>Create Repost</Typography>
                    <IconButton onClick={close} className="closeButton">
                        <CloseIcon />
                    </IconButton>
                </Box>
                <AuthorInfo></AuthorInfo>
                <form>
                    <TextField
                        placeholder="Your text here..."
                        fullWidth
                        multiline
                        variant="outlined"
                        rows={3}
                        value={newText}
                        onChange={handleTextChange}
                    ></TextField>
                    <Button
                        variant="contained" color="inherit" style={{ width: '100%' ,marginTop:"15px"}}
                        onClick={publish}
                    >Post</Button>
                </form>
            </Paper>
        </Modal>
    );
}

CreateRepostModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    postId: PropTypes.number,
    refresh: PropTypes.func
};