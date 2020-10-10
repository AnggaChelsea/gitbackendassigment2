const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
  static register(req, res, next) {
    const { username, email, password } = req.body;
    const user = new User({
      username,
      email,
      password,
    });
    
    user
      .save()
      .then((user) => {
        res.status(201).json({
          message: `welcome  ${user.username} hope enjoy play`,
        });
      })
      .catch(next);
  }

  //login menggunakan Username
  static login(req, res, next) {
    const { username, password } = req.body;
    User.findOne({ username })
      .then((user) => {
        console.log(user);
        if (user && bcrypt.compareSync(password, user.password)) {
          const access_token = jwt.sign({ _id: user._id }, 'ANGGALESMANA');
          res.status(200).json({ success: true, access_token });
        } else throw { name: 'LOGIN_FAIL' };
      })
      .catch(next);
  }
}

module.exports = UserController;
