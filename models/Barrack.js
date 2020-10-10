const mongoose = require('mongoose');
const {Schema} = mongoose.Schema;


const barrackSchema = new mongoose.Schema({
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: String,
    lastCollected: {
      type: Number,
      default: Date.now(),
    },
  });
  
  module.exports = mongoose.model('Market', barrackSchema);