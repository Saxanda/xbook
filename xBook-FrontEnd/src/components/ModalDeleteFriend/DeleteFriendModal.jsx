import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { modalDeleteFriend } from '../../redux/friends/friendsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFriend, getFriends } from '../../redux/friends/friendsThunks';
import { useEffect } from 'react';

export default function DeleteFriendModal() {
    const dispatch = useDispatch();

    const modalDeleteFriendState = useSelector((state) => state.friends.modalDeleteFriend) 
    const friend = useSelector((state) => state.friends.friend.obj);
    const userId = useSelector((state) => state.profile.profileData.obj.id);
    
    const modalDeleteFriendClose = async ()=>{
        await dispatch(modalDeleteFriend(false));
    };

    useEffect(() => {
      return ()=>{
        dispatch(modalDeleteFriend(false));
      };
    }, []);

    const deleteFriendFunc = async ()=>{
      await dispatch(deleteFriend({friendId:friend.id}));
      await dispatch(modalDeleteFriend(false));
      await dispatch(getFriends({userId}));
    };

    return (
        <Dialog
            open={modalDeleteFriendState}
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
    )
}