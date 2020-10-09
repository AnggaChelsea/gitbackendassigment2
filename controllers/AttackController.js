const User = require('../models/User');

class AttackController {
  static serang(req, res, next) {
    User.findById({
        _userId: req._id
      })
      .then(function (user) {
        if (user.resources.golds > 10 && user.resources.golds > 10) {
          const shot = user.resources;
          user.resources.golds - 10;
          user.resources.foods - 10;
          return User.updateOne({ _id: req._id }, { resources: shot });
        }else{
          User.updateOne({ _id: req._id})
          throw 'enemy death'
        }
      })
      .then((attack) => {
        
      })
  }
}