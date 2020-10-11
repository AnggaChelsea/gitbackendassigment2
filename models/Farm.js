const mongoose = require('mongoose');

const FarmSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    nameFarm: String,
    lastCollected: {
        type: Number,
        default: Date.now()
    },
})

const Farm = mongoose.model('Farm', FarmSchema);
module.exports = Farm;