const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        userAvatar: {
            type: String,
        },
        fullName: {
            type: String,
        },
        postId: {
            type: String,
        },
        text: {
            type: String,
            max: 500,
        },
        likes: {
            type: Array,
            default: [],
        },
        subCommentIds: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);
