import './ProfilePost.scss'
import Post from '../Post/Post'

export default function ProfilePost({post}) {
    
    return(
        <div>
            <Post
            postData={post} 
            postComments={null}
            refresh={() => {}}
            addToBookmarks={()=>{}}
            />
        </div>
    )
}