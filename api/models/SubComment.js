const mongoose = require('mongoose');

const SubCommentSchema = new mongoose.Schema(
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
        replyToUserId: {
            type: String,
        },
        commentId: {
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
    },
    { timestamps: true }
);

module.exports = mongoose.model('SubComment', SubCommentSchema);
