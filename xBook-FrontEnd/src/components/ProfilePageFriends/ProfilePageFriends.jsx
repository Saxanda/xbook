import './ProfilePageFriends.scss'
import Typography from '@mui/material/Typography';

export default function ProfilePageFriends() {
    
    return(
        <div>
            <div>
                <div>
                    <Typography variant='h6' sx={{fontWeight: 600}}>Friends</Typography>
                    <div>
                    <Button variant="contained" color='info'>Edit Bio</Button>
                    </div>
                </div>

            </div>
            <div>
                <ul>

                </ul>
            </div>
        </div>
    )
}