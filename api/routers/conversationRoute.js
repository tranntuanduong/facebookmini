const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');

// create a conversation: [POST] api/conversations/
router.post('/', async (req, res) => {
    try {
        const conversation = new Conversation(req.body);
        const savedConversation = await conversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get a conversation by memberId [GET] api/conversations
router.put('/', async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            memberIds: { $all: [req.body.senderId, req.body.receiverId] },
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get list conversation of loginUser
router.get('/all', async (req, res) => {
    try {
        const conversations = await Conversation.find({ memberIds: { $in: req.body.userId } });
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json(error);
    }
});
module.exports = router;
