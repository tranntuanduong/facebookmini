const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        username: {
            type: String,
            // required: true,
            min: 3,
            max: 20,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 3,
        },
        avatar: {
            type: String,
        },
        coverImg: {
            type: String,
            dafault: '',
        },
        phonenumber: {
            type: String,
            dafault: '',
        },
        friends: {
            type: Array,
            default: [],
        },
        followingIds: {
            type: Array,
            default: [],
        },
        followerIds: {
            type: Array,
            default: [],
        },
        detailList: {
            type: Array,
            default: [],
        },
        firstName: {
            type: String,
            dafault: '',
        },
        lastName: {
            type: String,
            dafault: '',
        },
        birthDay: {
            type: String,
            dafault: '',
        },
        sex: {
            type: String,
            dafault: '',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
