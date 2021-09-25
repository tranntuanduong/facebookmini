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
// changelikes comment
router.put('/:id/changelikes', async function (req, res) {
    try {
        const subComment = await SubComment.findOne({ _id: req.params.id });
        // like post
        await subComment.updateOne({
            $pull: { likes: { userId: req.body.userId } },
        });
        await subComment.updateOne({
            $push: {
                likes: {
                    type: req.body.type,
                    userId: req.body.userId,
                    text: req.body.text,
                    styleColor: req.body.styleColor,
                },
            },
        });
        res.status(200).json('The post has been ' + req.body.type);
    } catch (error) {
        res.status(500).json(error);
    }
});

// like comment
router.put('/:id/likes', async function (req, res) {
    try {
        const subComment = await SubComment.findOne({ _id: req.params.id });
        if (!subComment.likes.some((like) => like['userId'] === req.body.userId)) {
            // like post
            await subComment.updateOne({
                $push: {
                    likes: {
                        type: req.body.type,
                        userId: req.body.userId,
                        text: req.body.text,
                        styleColor: req.body.styleColor,
                    },
                },
            });
            res.status(200).json('The post has been ' + req.body.type);
        } else {
            await subComment.updateOne({
                $pull: { likes: { userId: req.body.userId } },
            });
            res.status(200).json('The post has dislike ');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
