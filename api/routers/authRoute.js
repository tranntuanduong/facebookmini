const express = require('express');
const router = express.Router();
const User = require('./../models/User');

// register: [POST] api/auth/register
router.post('/register', async function (req, res) {
    try {
        const newUser = new User(req.body);
        newUser.username = req.body.email.split('@')[0];
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

// login: [POST] api/auth/login
router.post('/login', async function (req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json('user not found');

        const validPassword = user.password === req.body.password;
        !validPassword && res.status(400).json('wrong password');

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
