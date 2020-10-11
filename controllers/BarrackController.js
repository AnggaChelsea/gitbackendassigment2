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
            throw 'NOT_ENOUGH'
          }
        } else {
          throw 'NOT_FOUND'
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

  //get list barrack
  static get(req, res, next) {
    const {
      id
    } = req.params;
    Barrack.find({
      _userId: req._userId
    })
      .then((barrack) => {
        res.status(200).json({
          success: true,
          message: barrack
        })
      })
      .catch(next);
  }

  //get by id
  static getById(req, res, next) {
    const id = req.params;
    Barrack.findById({
        _id: id
      })
      .then((barrack) => {
        if (barrack) {
          // const soldiers = Math.floor((Date.now() - barrack.lastCollected) / 60000);
          // res.status(200).json({
          // 	success: true,
          // 	message: `this your data ${barrack} `,
          // 	soldiers: soldiers > 10 ? 10 : soldiers
          // });
          res.status(200).json({
            message: 'i got u'
          })
        } else {
          throw 'NOT_FOUND'
        }
      })
      .catch(next);
  }

}


module.exports = BarrackController;