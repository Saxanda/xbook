import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch } from 'react-redux';

export default function DeleteFriendModal({ open, onClose, onDelete, friend }) {
    const dispatch = useDispatch();

    const modalDeleteFriendClose = async () => {
        onClose();
    };

    const deleteFriendFunc = async () => {
        await onDelete();
    };

    return (
        <Dialog
            open={open}
            onClose={modalDeleteFriendClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {`Remove ${friend.name} ${friend.surname} from friends`}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to remove {`${friend.name} ${friend.surname}`} from friends?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                    variant='contained'
                    onClick={modalDeleteFriendClose}
                >
                    No
                </Button>
                <Button 
                    color='error'
                    variant='contained'
                    onClick={deleteFriendFunc} 
                    autoFocus
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}
