import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Paper, Typography, IconButton,Avatar,TextField,Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function CreateRepostModal({ open, handleClose, postId }){
    const [newText, setNewText] = useState('');
    const handleTextChange = (event) => {
        setNewText(event.target.value);
    };
    const publish=()=>{
        console.log(postId);
        handleClose();
        setNewText('')
    }
    return (
        <Modal open={open} onClose={handleClose}>
            <Paper
                elevation={3}
                style={{
                    padding: '20px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '400px',
                    maxWidth: '90%'
                }}
            >
                <Typography variant="h5" gutterBottom>Створити Репост</Typography>
                <IconButton onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px', padding: '0' }}>
                    <CloseIcon />
                </IconButton>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
                    <Typography style={{ marginLeft: '10px' }}>юзернейм</Typography>
                </div>
                <form>
                    <TextField
                        placeholder="Ваш текст тут..."
                        fullWidth
                        multiline
                        variant="outlined"
                        rows={3}
                        value={newText}
                        onChange={handleTextChange}
                    ></TextField>
                    <Button
                        variant="contained" color="primary" style={{ width: '100%' ,marginTop:"15px"}}
                        onClick={publish}
                    >Публікувати</Button>
                </form>
            </Paper>
        </Modal>
    );
}

CreateRepostModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    postId: PropTypes.string.isRequired,
};