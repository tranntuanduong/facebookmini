const express = require('express');
const User = require('../models/User');
const router = express.Router();
const Post = require('./../models/Post');

// create: [POST] api/posts
router.post('/', async function (req, res) {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get my post and friends'post: [GET] api/posts
router.get('/:userId', async function (req, res) {
    try {
        const currentUser = await User.findOne({ _id: req.params.userId });

        const myPosts = await Post.find({ userId: req.params.userId }); // get my post

        const followingPost = await Promise.all(
            currentUser.followingIds.map((id) => {
                return Post.find({ userId: id });
            })
        );

        res.json(myPosts.concat(...followingPost));
    } catch (error) {
        res.status(500).json(error);
    }
});

// get my post [GET] api/posts/myposts
router.get('/:userId/me', async function (req, res) {
    try {
        let myPosts;
        if (req.params.userId) {
            myPosts = await Post.find({ userId: req.params.userId }); // get my post
        } else {
            const currentUser = await User.findOne({ _id: req.params.username });
            myPosts = await Post.find({ userId: currentUser._id }); // get my post
        }
        res.json(myPosts);
    } catch (error) {
        res.status(500).json(error);
    }
});

// // changelikes post
router.put('/:id/changelikes', async function (req, res) {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        await post.updateOne({
            $pull: { likes: { userId: req.body.userId } },
        });
        // like post
        await post.updateOne({
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

// like post
router.put('/:id/likes', async function (req, res) {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        if (!post.likes.some((like) => like['userId'] === req.body.userId)) {
            // like post
            await post.updateOne({
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
            await post.updateOne({
                $pull: { likes: { userId: req.body.userId } },
            });
            res.status(200).json('The post has dislike ');
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
