import './ProfilePost.scss'
import Post from '../Post/Post'

export default function ProfilePost({post, refresh, addToBookmarks, removeFromBookmarks}) {
    
    return(
        <div>
            <Post
            postData={post} 
            postComments={null}
            addToBookmarks={addToBookmarks}
            refresh={refresh}
            removeFromBookmarks={removeFromBookmarks}
            />
        </div>
    )
}