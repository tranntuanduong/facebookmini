const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema(
    {
        userId: {
            type: String,
        },
        desc: {
            type: String,
            max: 500,
        },
        img: {
            type: String,
        },
        likeIds: {
            type: Array,
            default: [],
        },
        viewerIds: {
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
        style: {
            type: Object,
            default: {},
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Story', StorySchema);
