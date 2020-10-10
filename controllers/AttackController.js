const User = require('../models/User');

class AttackController {
  static serang(req, res, next) {
  res.status(200).json({success:true})
  }
}

module.exports = AttackController;