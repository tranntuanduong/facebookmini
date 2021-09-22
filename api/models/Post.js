const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        desc: {
            type: String,
            max: 500,
        },
        imgCollections: {
            type: Array,
        },
        likes: {
            type: Array,
            default: [],
        },
        commentIds: {
            type: Array,
            default: [],
        },
        isPublic: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
