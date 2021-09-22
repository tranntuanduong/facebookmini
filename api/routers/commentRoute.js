const express = require('express');
const User = require('../models/User');
const router = express.Router();
const Comment = require('./../models/Comment');

// create: [POST] api/comments
router.post('/', async (req, res) => {
    const newComment = new Comment(req.body);
    try {
        const savedComment = await newComment.save();
        res.status(200).json(savedComment);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get  count comment of post: [GET] api/comments/count/:postId/:skip
router.get('/count', async (req, res) => {
    try {
        // Cloud doesn't allow unauthenticated invocations
        // const count = await Comment.countDocuments({ postId: req.body.postId });
        const count = await Comment.countDocuments({ postId: req.query.postId });
        res.status(200).json(count);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get  list comment of post: [GET] api/comments/:postId/:skip
router.get('/:postId/:skip', async (req, res) => {
    try {
        const commentList = await Comment.find({ postId: req.params.postId })
            .sort({ createdAt: -1 })
            .skip(Number.parseInt(req.params.skip))
            .limit(3);
        res.status(200).json(commentList);
    } catch (error) {
        res.status(500).json(error);
    }
    // res.send(req.params.skip);
});

module.exports = router;
