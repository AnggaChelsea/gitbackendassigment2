const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Resource = require('./Resource')
const Schema = mongoose.Schema;


const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email"
    },
    required: [true, "Email required"]
  },
  password: {
    type: String,
    required: true
  },
  townhallNames: {
    type: String,
    required: true
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