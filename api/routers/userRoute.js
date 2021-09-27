var express = require('express');
var router = express.Router();
const User = require('./../models/User');

// get user by id || username: api/users
router.get('/', async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        let user;
        if (userId) {
            user = await User.findOne({ _id: userId });
        } else {
            if (username) {
                user = await User.findOne({ username: username });
            }
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get list user [PUT*] api/users/list
router.put('/list', async (req, res) => {
    /*vi get method k co body */
    const userIds = req.body.userIds;
    try {
        const userList = await Promise.all(
            userIds.map((userId) => {
                return User.findOne({ _id: userId });
            })
        );
        res.status(200).json(userList);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;
