const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    min: [6, 'Too few pass'],
    max: 12,
    required: true
  },
  resources: {
    golds: {
      type: Number,
      default: 100
    },
    foods: {
      type: Number,
      default: 100
    },
    soldiers: {
      type: Number,
      default: 0
    },
  },
});

//use schema pre for save register
userSchema.pre('save', function (next){
  User.findOne({
      email: this.email
    })
    .then((user) => {
      if (user) {
        next({name: 'EMAIL_ALREADY_EXISTS'});
      } else {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
        next();
      }
    })
    .catch((e) => next('MONGOOSE_ERROR'));
});

const User = mongoose.model('User', userSchema);

module.exports = User;