import { useState } from 'react';
import { Avatar, Button, Modal, Paper,Typography } from '@mui/material';

export default function CreatePost(){
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const publish =() =>{
        setOpen(false);
    }
    
    return(
        <>
        <Paper style={{ width: '100%', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',boxSizing: "border-box", gap:"10px" }}>
            <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
            <Button
                variant="contained"
                color="primary"
                onClick={handleOpen}
                style={{width:"100%", backgroundColor: 'rgba(173, 173, 173, 0.3)', textAlign: 'left' }} 
            >
                Що у вас на думці?
            </Button>
            {/* кнопку переробити */}
        </Paper>

        <Modal open={open} onClose={handleClose}>
            <Paper elevation={3} style={{ padding: '20px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', maxWidth: '90%' }}>
                <Typography variant="h5" gutterBottom>Створити допис</Typography>

                <Button onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>Закрити</Button>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />
                    <Typography style={{ marginLeft: '10px' }}>юзернейм</Typography>
                </div>
                <form>
                    <textarea
                        placeholder="Ваш текст тут..."
                        style={{ width: '100%', minHeight: '100px', marginBottom: '20px', padding: '10px' }}
                    ></textarea>
                    <input type="file" accept="image/*" style={{ marginBottom: '20px' }} />
                    
                    {/* Кнопка Публікувати */}
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