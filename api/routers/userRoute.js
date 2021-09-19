var express = require('express');
var router = express.Router();

// get friendList: api/users/friends
router.get('/', function (req, res) {
    res.json('JSONNNNN');
});

module.exports = router;
