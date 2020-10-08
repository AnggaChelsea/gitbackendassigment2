const Townhall = require('../models/Townhall');

class TownhallController {
  static create(req, res, next) {
    const {
      townhallNames
    } = req.body;
    const townhall = new Townhall({
      _userId: req._userId,
      townhallNames: townhallNames,
      invadecooldown: 240,
      health: 10,
      gold: 20,
      meats: 10,
      energy: 10
    })
    townhall.save()
    .then(function(result){
      res.status(201).send({message: 'succes welcome', data: result})
    })
    .catch(next)
  }


  static town(req, res, next) {
    Townhall.find({
      _userId: req._userId
    }).then((townhalls) => {
      res.status(200).json({
        success: true,
        data: townhalls
      });
    });
  }

  // static create(req, res, next) {
  //   const {
  //     townhallNames
  //   } = req.body;
  //   const townhall = new Townhalls({
  //     _userId: req._userId,
  //     townhallNames,
  //     invadecooldown: 0,
  //     health: 0,
  //     gold: 0,
  //     meats: 0,
  //     energy: 25
  //   });
  //   townhall.save()
  //     .then((townhall) => res.status(201).json({
  //       success: true,
  //       message: 'great townhall has created',
  //     }))
  //     .catch(next);
  // }


  // static post(req, res, next) {
  //   const { townhall,  } = req.body;
  //   const townhall = new Townhall({
  //     _userId: req._userId,
  //     townhall,
  //   });
  //   townhall
  //     .save()
  //     .then((townhall) => {
  //       res.status(201).json({ success: true, data: townhall });
  //     })
  //     .catch(next);
  // }

  // static get(req, res, next) {
  //   Townhall.findOne({ _id: req.params.id })
  //     .then((townhall) => {
  //       res.status(200).json({ succes: true, data: townhall });
  //     })
  //     .catch(next);
  // }

  static put(req, res, next) {
    const { townhallNames,  } = req.body;
    Townhall.findOne({ _id: req.params.id })
      .then((townhallNames) => {
        townhallNames.townhallNames = townhallNames;
        return townhallNames.save();
      })
      .then((townhall) => {
        res.status(200).json({ succes: true, data: townhall });
      })
      .catch(next);
  }

  // static delete(req, res, next) {
  //   Townhall.findOne({ _id: req.params.id })
  //     .then((townhall) => {
  //       return townhall.remove();
  //     })
  //     .then((townhall) => {
  //       res.status(200).json({ success: true, data: { deleted: townhall } });
  //     })
  //     .catch(next);
  //     //townhall
  // }
}
module.exports = TownhallController;