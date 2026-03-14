import Post from "./Post.jsx";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getPosts } from "../actions/posts.js";

function Posts(){
     const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

        return(
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {
                    posts?.map((post)=>{
                        return <Post key={post._id} post={post}/>  // Map over posts array to render each Post component in a responsive grid layout
                    })
                }
            </div>
        )
}
export default Posts;