const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    goal: {
        type: Number,
        required: true
    },
    raised: {
        type: Number,
        default: 0
    },
    img: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: 'No description'
    }
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);
