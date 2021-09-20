var express = require('express');
var router = express.Router();
const User = require('./../models/User');

// get friendList: api/users/friends
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

module.exports = router;
