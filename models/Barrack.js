const mongoose = require('mongoose');


const barrackSchema = new mongoose.Schema({
    _userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    nameBarrack: String,
    lastCollected: {
      type: Number,
      default: Date.now(),
    },
  });
  
 const Barrack = mongoose.model('Barrack', barrackSchema);
 module.exports = Barrack;