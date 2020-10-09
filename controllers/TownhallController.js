const User = require('../models/User');

class TownhallController {
  static get(req, res, next) {
    User.findOne(req._id)
      .then((user) => {
        console.log(user)
        if(user) {
          console.log(user, 'found');
          res.status(200).json({ success: true, data: user.resources });
        } else {
          throw 'USER_NOT_FOUND';
        }
      })
      .catch(next);
  }
}

module.exports = TownhallController;
