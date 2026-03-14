import mongoose from "mongoose";
import PostMessage from "../Models/PostMessage.js";

export const getPost=async (req,res)=>{
  try {
        const postMessage=await PostMessage.find(); // fetch all posts from database
        res.status(202).json(postMessage);
 } catch (error) {
        res.status(404).json({message:error.message});
 }
}

export const createPost=async (req,res)=>{
  const post=req.body; //get post data from client
  const newPost=new PostMessage(post); //create new post document
  try {
    await newPost.save(); //save in db 
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({message:error.message})
  }
  console.log(post);
}

export const likePost= async (req,res)=>{
        const { id }=req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
          res.status(404).send("No post with that ID");     
         }
      const post= await PostMessage.findById(id);
         if (!post) {
    return res.status(404).send("Post not found");
  }
      const updatePost=await PostMessage.findByIdAndUpdate(
        id,
        {likeCount:post.likeCount+1},
        {new:true}

      );
      res.json(updatePost);
}

export const searchPosts = async (req, res) => {
  const { q } = req.query;
  try {
    if (!q) return res.json([]);
    const regex = new RegExp(q, "i");
    const posts = await PostMessage.find({
      $or: [
        { title: regex },
        { creator: regex },
        { tags: regex },
        { message: regex },
      ],
    }).limit(5);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req,res)=>{
     const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with that id");
  }
  await PostMessage.findByIdAndDelete(id);
  res.json({message:"Post deleted successfully"});
}