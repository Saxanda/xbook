import { useState } from 'react';
import { Avatar, Button, Modal, Paper, Typography, TextField, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhotoIcon from '@mui/icons-material/Photo';
import PostMediaGrid from './PostMediaGrid';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function CreatePostModal({ open, handleClose }) {
    const [newText, setNewText] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [imgURLs, setImgURLs] = useState([]);
    const [isDraggingOver, setIsDraggingOver] = useState(false);

    const handleTextChange = (event) => {
        setNewText(event.target.value);
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const urls = files.map(file => URL.createObjectURL(file));
        setSelectedImages(prev => [...prev, ...files]);
        setImgURLs(prev => [...prev, ...urls]);
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
        setIsDraggingOver(false);
    };

    const uploadImageToCloudinary = async (image) => {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'q9y44yom');

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dhtfpfvuf/image/upload', formData);
            return response.data.secure_url;
        } catch (error) {
            console.error('Error uploading image:', error);
            return null;
        }
    };

    const publish = async () => {
        const imageUrls = await Promise.all(selectedImages.map(image => uploadImageToCloudinary(image)));
        const postData = {
            text: newText,
            images: imageUrls.filter(url => url !== null)
        };
        console.log('Post Data:', postData);

        handleClose();
        setNewText('');
        setSelectedImages([]);
        setImgURLs([]);
    };
    const close = () =>{
        handleClose();
        setNewText('');
        setSelectedImages([]);
        setImgURLs([]);
    }

    return (
        <Modal open={open} onClose={close}>
            <Paper
                elevation={3}
                style={{
                    padding: '20px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', maxWidth: '90%',
                    backgroundColor: isDraggingOver ? 'rgba(192, 192, 192)' : 'rgba(255, 255, 255)',
                    transition: 'background-color 0.3s'
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <Typography variant="h5" gutterBottom>Створити допис</Typography>
                <IconButton onClick={close} style={{ position: 'absolute', top: '10px', right: '10px', padding: '0' }}>
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
                    <input type="file" accept="image/*" id="file-input" style={{ display: 'none' }} onChange={handleImageChange} multiple />
                    <label htmlFor="file-input">
                        <IconButton component="span">
                            <PhotoIcon />
                        </IconButton>
                        <IconButton onClick={() => { setSelectedImages([]); setImgURLs([]);document.getElementById("file-input").value="" }}>
                            <DeleteIcon />
                        </IconButton>
                    </label>
                    <div style={{ marginBottom: '20px' }}>
                        <PostMediaGrid media={imgURLs}></PostMediaGrid>
                    </div>
                    <Button
                        variant="contained" color="primary" style={{ width: '100%' }}
                        onClick={publish}
                    >Публікувати</Button>
                </form>
            </Paper>
        </Modal>
    );
}

CreatePostModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};