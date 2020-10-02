const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const townhallSchema = new Schema({
  _userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  townhallNames: { type: String, required: true , unique: true},
  invadecooldown: { type: Number, max:240 },
  health: { type: Number },
  gold: { type: Number},
  meats: { type: Number},
  energy: { type: Number, max:50},
  
});

townhallSchema.pre('save', (next)=>{
  //check townhal is exist
  Townhall.findOne({townhallNames: this.townhallNames})
  .then((townhallNames)=>{
    if(townhallNames) next({name: 'ALREADY_EXISTS '});
    else{ next() }
  })
  .catch((_err)=>{
    next({name: 'this Error'})
  })
})

const Townhall = mongoose.model('Townhall', townhallSchema);

module.exports = Townhall

