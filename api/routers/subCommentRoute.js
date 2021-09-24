const express = require('express');
const User = require('../models/User');
const router = express.Router();
const SubComment = require('./../models/SubComment');

// create: [POST] api/subComments
router.post('/', async (req, res) => {
    const newSubComment = new SubComment(req.body);
    try {
        const savedSubComment = await newSubComment.save();
        res.status(200).json(savedSubComment);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:commentId', async (req, res) => {
    try {
        const subCommentList = await SubComment.find({ commentId: req.params.commentId }).sort({
            createdAt: 1,
        });
        res.status(200).json(subCommentList);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/:commentId/count', async (req, res) => {
    try {
        const count = await SubComment.find({ commentId: req.params.commentId }).count();
        res.status(200).json(count);
    } catch (error) {
        res.status(500).json(error);
    }
});

/*
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

*/

module.exports = router;
