import { useState } from 'react';
import { Avatar, Button, Modal, Paper, Typography, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhotoIcon from '@mui/icons-material/Photo';
import PostMediaGrid from './PostMediaGrid';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CreatePost(){
    const [open, setOpen] = useState(false);
    const [newText, setNewText] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [imgURLs,setImgURLs] = useState([]);
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const handleTextChange = (event) => {
        setNewText(event.target.value);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setNewText('');
        setSelectedImages([]);
        setImgURLs([]);
    };
    const handleImageChange = (event) => {
        const files = event.target.files;
        const urls = Array.from(files).map(file => URL.createObjectURL(file));
        setSelectedImages([...selectedImages, ...files]);
        setImgURLs([...imgURLs, ...urls]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDraggingOver(true);
    };
    const handleDragLeave = () => {
        setIsDraggingOver(false);
    };
    const handleDrop = (event) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        handleImageChange({ target: { files } });
    };

    const publish = () =>{
        setOpen(false);
        setNewText('');
        setSelectedImages([]);
        setImgURLs([]);
    }
    
    return(
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

            <Modal open={open} onClose={handleClose}>
                <Paper 
                    elevation={3} 
                    style={{ padding: '20px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', maxWidth: '90%',
                    backgroundColor: isDraggingOver ? 'rgba(192, 192, 192)' : 'rgba(255, 255, 255)',
                    transition: 'background-color 0.3s'
                    }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <Typography variant="h5" gutterBottom>Створити допис</Typography>
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
                        <input type="file" accept="image/*" id="file-input" style={{ display: 'none' }} onChange={handleImageChange} />
                        <label htmlFor="file-input">
                            <IconButton component="span">
                                <PhotoIcon />
                            </IconButton>
                            <IconButton onClick={() => { setSelectedImages([]); setImgURLs([]); }}>
                                <DeleteIcon />
                            </IconButton>
                        </label>
                        <div style={{ marginBottom: '20px' }}>
                            <PostMediaGrid
                                    media={imgURLs}
                            ></PostMediaGrid>
                        </div>
                        <Button 
                            variant="contained" color="primary" style={{ width: '100%' }}
                            onClick={publish}
                        >Публікувати</Button>
                    </form>
                </Paper>
            </Modal>
        </>
    )
}