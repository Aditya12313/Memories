import {useDispatch} from 'react-redux';
import { likePost, deletePost } from '../actions/posts';

function Post({post}){
    const dispatch = useDispatch();
    return(
        <div className='bg-white rounded-xl shadow-md overflow-hidden'>
            <img src={post.selectedFile} alt="post" className='h-48 w-full object-cover' />
            <div className="p-4">
                <p className="text-xl text-blue-800 ">  {post.creator} </p>
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p className="text-gray-600 mt-2">{post.message}</p>
                <p className="text-blue-500 text-md mt-2">{post.tags.map(tag=>`#${tag}`)}</p>
                <div className="flex justify-between mt-4">
                    <button onClick={()=>dispatch(likePost(post._id))} className='text-green-600 hover:text-blue-800'>\
                        
                        👍 Like {post.likeCount}
                    </button>
                    <button onClick={()=>dispatch(deletePost(post._id))} className='text-red-600 hover:text-red-800'>
                       Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Post;