const mongoose = require('mongoose');

/* Streamer schema to mongodb */
const StreamerSchema = new mongoose.Schema({
    Id: {
        type: String,
        required: true
    },
    Nick: {
        type: String,
        required: true
    },
    Platform: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Upvotes: {
        type: Number,
        required: true
    },
    Downvotes: {
        type: Number,
        required: true
    },
    Points: {
        type: Number,
        required: true
    }
})


module.exports = mongoose.model('Streamer', StreamerSchema);