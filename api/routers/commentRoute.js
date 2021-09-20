const express = require('express');
const User = require('../models/User');
const router = express.Router();
const Comment = require('./../models/Comment');

// create: [POST] api/comments
router.post('/', async function (req, res) {
    const newComment = new Comment(req.body);
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get  list comment of post: [GET] api/comments
router.get('/:postId', async function (req, res) {
    try {
        const commentList = await Comment.find({ postId: req.params.postId });
        res.status(200).json(commentList);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
