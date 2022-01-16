import express from 'express';

import { getPost, createPost, updatePost, deletePost } from '../controllers/provider.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.post('/', auth,  createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

export default router;