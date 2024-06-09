import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { modalDeleteFriend, modalDeleteFriendProfile } from '../../redux/friends/friendsSlice';
import { deleteFriend, getFriends } from '../../redux/friends/friendsThunks';

export default function DeleteFriendModal({ open, onClose, onDelete, friend, friendsPage, profilePage, setFriendsPage, setProfilePage }) {
    const dispatch = useDispatch();
    const modalDeleteFriendState = useSelector((state) => state.friends.modalDeleteFriend);
    const modalDeleteFriendProfileState = useSelector((state) => state.friends.modalDeleteFriendProfile);
    const userId = useSelector((state) => state.profile.profileData.obj.id);

    const modalDeleteFriendClose = () => {
        if (friendsPage) {
            dispatch(modalDeleteFriend(false));
            setFriendsPage(false);
        }
        if (profilePage) {
            dispatch(modalDeleteFriendProfile(false));
            setProfilePage(false);
        }
    };

    const deleteFriendFunc = async () => {
        console.log("FRIEND ID: ", friend.id);
        await onDelete();
        if (friendsPage) {
            dispatch(modalDeleteFriend(false));
            setFriendsPage(false);
        }
        if (profilePage) {
            dispatch(modalDeleteFriendProfile(false));
            setProfilePage(false);
        }
        await dispatch(getFriends({ userId }));
    };

    const isOpen = friendsPage ? (open || modalDeleteFriendState) : profilePage ? (open || modalDeleteFriendProfileState) : open;
    // console.log(isOpen);
    // console.log("FRIENDS PAGE: ", friendsPage);
    // console.log("Profile PAGE: ", profilePage);
    return (
        <Dialog
            open={isOpen}
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
