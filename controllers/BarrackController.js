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
  static barrackcollected(req, res, next) {
    let soldiers;
    Barrack.findById(req.params.Id)
      .then((barrack) => {
        if (barrack) {
          soldiers = Math.floor((Date.now() - barrack.lastCollected) / 60000);
          soldiers = soldiers > 10 ? 10 : soldiers; //
          barrack.lastCollected = Date.now();
          return barrack.save();
        } else {
          throw "NOT_FOUND";
        }
      })
      .then((barrack) => {
        return User.findById(req._userId);
      })
      .then((user) => {
        console.log(user);
        const resources = user.resources;
        resources.soldiers += soldiers;
        return User.findOneAndUpdate(
          { _id: req._userId },
          { resources: resources }
        );
      })
      .then((result) => {
        res.status(200).json({
          success: true,
          message: `${soldiers} soldiers has been added to your resources`,
        });
      })
      .catch(next);
  }

  static changebarrack(req, res, next) {
    const { nameBarrack } = req.body;
    Barrack.findById(req.params.Id)
      .then((barrack) => {
        console.log(barrack);
        if (barrack) {
          barrack.nameBarrack = nameBarrack;
          return barrack.save();
        } else {
          throw "Not_Found";
        }
      })
      .then((barrack) => {
        res.status(200).json({ success: true, data: barrack });
      })
      .catch(next);
  }

  static Put(req, res, next) {
    const { nameBarrack } = req.body;
    Barrack.findById(req.params.Id)
      .then((barrack) => {
        console.log(barrack);
        if (barrack) {
          barrack.nameBarrack = nameBarrack;
          return barrack.save();
        } else {
          throw "Not_Found";
        }
      })
      .then((barrack) => {
        res.status(200).json({ success: true, data: barrack });
      })
      .catch(next);
  }

}


module.exports = BarrackController;