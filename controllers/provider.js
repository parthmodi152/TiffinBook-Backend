import express from 'express';
import mongoose from 'mongoose';

import ProviderTiffin from '../models/provider.js';

const router = express.Router();

export const getPost = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await ProviderTiffin.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;

    const newProviderTiffin = new ProviderTiffin({ ...post, createdAt: new Date().toISOString() })

    try {
        await newProviderTiffin.save();

        res.status(201).json(newProviderTiffin );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await ProviderTiffin.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await ProviderTiffin.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}


export default router;