const express = require('express');
const Message = require('../models/Message');
const router = express.Router();

// create a message [POST] api/messages/
router.post('/', async (req, res) => {
    try {
        const message = new Message(req.body);
        const savedMessage = await message.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get message by conversationId [GET] api/messages/
router.get('/:conversationId', async (req, res) => {
    try {
        const messages = await Message.find({ conversationId: req.params.conversationId });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
