const express = require('express');
const router = express.Router();
const Story = require('../models/Story');
const User = require('../models/User');

// [POST] stories/
router.post('/', async (req, res) => {
    try {
        const story = new Story(req.body);
        const savedStory = await story.save();
        res.status(200).json(savedStory);
    } catch (error) {
        res.status(500).json(error);
    }
});

// [GET] stories/
router.get('/:userId', async (req, res) => {
    let storyViewer = [];
    try {
        const myStories = await Story.find({ userId: req.params.userId });
        const currentUser = await User.findOne({ _id: req.params.userId });

        const followingStories = await Promise.all(
            currentUser.followingIds.map((id) => {
                const story = Story.find({ userId: id });
                return story;
            })
        );

        const stories = myStories.concat(...followingStories);

        const userIds = stories.map((story) => story.userId);
        const uniqueUserIds = new Set(userIds);

        uniqueUserIds.forEach((userId) => {
            const userStory = stories.map((story) => {
                if (userId === story.userId) return story;
            });

            storyViewer.push(userStory.filter((n) => n));
        });

        res.status(200).json(storyViewer);
    } catch (error) {
        res.status(500).json(error);
    }
});

// [GET] stories/
router.get('/view-home/:userId', async (req, res) => {
    let storyViewer = [];
    try {
        const myStories = await Story.find({ userId: req.params.userId });
        const currentUser = await User.findOne({ _id: req.params.userId });

        const followingStories = await Promise.all(
            currentUser.followingIds.map((id) => {
                const story = Story.find({ userId: id });
                return story;
            })
        );

        const stories = myStories.concat(...followingStories);

        const userIds = stories.map((story) => story.userId);
        const uniqueUserIds = new Set(userIds);

        uniqueUserIds.forEach((userId) => {
            const userStory = stories.map((story) => {
                if (userId === story.userId) return story;
            });
            if (storyViewer.length < 4) {
                storyViewer.push(userStory.filter((n) => n));
            }
        });

        res.status(200).json(storyViewer);
    } catch (error) {
        res.status(500).json(error);
    }
});

// update viewer
router.put('/:id', async (req, res) => {
    try {
        const story = await Story.findOne({ _id: req.params.id });
        await story.updateOne({ $push: { viewerIds: req.body.userId } });
        res.status(200).json('The story has been view by ' + req.body.userId);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
