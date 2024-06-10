import { useState } from 'react';
import { Button, Modal, Paper, Typography, TextField, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhotoIcon from '@mui/icons-material/Photo';
import PostMediaGrid from './PostMediaGrid';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import PropTypes from 'prop-types';
import { createPost } from './postApi';
import AuthorInfo from './sideComponents/AuthorInfo';

export default function CreatePostModal({ open, handleClose,onPostCreated }) {
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
            title: "",
            body: newText ,
            media: imageUrls[0] || null, // тимчасове рішення
            type:"ORIGINAL"
        };
        console.log('Post Data:', postData);

        try {
            const response = await createPost(postData);
            console.log('Post created successfully:', response);
            handleClose();
            setNewText('');
            setSelectedImages([]);
            setImgURLs([]);
            onPostCreated();
        } catch (error) {
            console.error('Error creating post:', error);
        }
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
                className={`createPost_modal ${isDraggingOver ? 'isDraggingOver' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <Box  className="createPost_modal_header">
                    <Typography variant="h5" gutterBottom>Create post</Typography>
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
                        variant="contained" color="inherit" style={{ width: '100%' }}
                        onClick={publish}
                    >Post</Button>
                </form>
            </Paper>
        </Modal>
    );
}

CreatePostModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    onPostCreated: PropTypes.func
};