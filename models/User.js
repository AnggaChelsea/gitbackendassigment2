const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  townhallNames: {
    type: String,
    required:true
  },
  resources: {
    type: Schema.Types.ObjectId,
    ref: 'Resource',
    autopopulate: true,
  },
  buildings:{
    type: Schema.Types.ObjectId,
    ref: 'Building',
    autopopulate: true,
  },

});

userSchema.pre('save', function (next) {
  User.findOne({
      email: this.email
    })
    .then((user) => {
      if (user) next({
        name: 'ALREADY_EXISTS'
      });
      else {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
        next();
      }
    })
    .catch((e) => next({
      name: 'MONGOOSE_ERROR'
    }));
});

const User = mongoose.model('User', userSchema);

module.exports = User;