const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Townhall = mongoose.model('Townhall', townhallSchema);

module.exports = Townhall

