const Barrack = require('../models/Barrack');
const User = require('../models/User');

class BarrackController {
  static post(req, res, next) {
    User.findById({
        _id: req._userId
      })
      .then((user) => {
        if (user) {
          if (user.resources.golds >= 10 && user.resources.foods >= 30) {
            const resources = user.resources;
            resources.golds -= 10;
            resources.foods -= 30;
            return User.updateOne({
              _id: req._userId
            }, {
              resources: resources
            })
          } else {
            throw (next)
          }
        } else {
          throw (next)
        }
      })
      .then((_) => {
        const {
          nameBarrack
        } = req.body;
        const barrack = new Barrack({
          _userId: req._userId,
          nameBarrack
        });
        return barrack.save();
      })
      .then((barrack) => {
        res.status(201).json({
          success: true,
          data: barrack
        })
      })
      .catch(next);
  }
}
module.exports = BarrackController;