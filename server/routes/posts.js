import express from 'express';
import { getPost, createPost, likePost, deletePost, searchPosts } from '../controllers/posts.js';
import { ensureAuthenticated } from '../Middleware/Auth.js';
const router=express.Router()

router.get('/search', searchPosts);
router.get('/',getPost);
router.post('/',ensureAuthenticated,createPost);
router.patch("/:id/likePost", ensureAuthenticated,likePost);
router.delete("/:id", ensureAuthenticated,deletePost);
export default router;