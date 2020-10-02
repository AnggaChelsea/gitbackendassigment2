const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
  static register(req, res, next) {
    const {
      username,
      email,
      password,
      townhallNames
    } = req.body;
    const user = new User({
      username,
      email,
      password,
      townhallNames,
    });
    user.save()
      .then((user) => {
        res.status(201).json({
          success: true,
          data: {
            _id: user._id,
            username: user.username,
            email: user.email
          }
        });
      })
      .catch(next);
  }

  static login(req, res, next) {
    const {
      email,
      password
    } = req.body;
    User.findOne({
        email
      })
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const access_token = jwt.sign({
            id: user._id
          }, 'SALT_ACADEMY');
          res.status(200).json({
            success: true,
            access_token
          });
        } else throw {
          name: 'LOGIN_FAIL'
        };
      })
      .catch(next);
  }

  static deleteUser(req, res, next) {
    User.findOne({
        _id: req.params.id
      })
      .then((user) => {
        return user.remove();
      })
      .then((user) => {
        res.status(200).json({
          success: true,
          data: {
            deleted: user
          }
        });
      })
      .catch(next);
  }

}

module.exports = UserController;