const Farm = require('../models/Farm');
const User = require('../models/User');

class FarmController {
  static post(req, res, next) {
    User.findById({
        _id: req._userId
      })
      .then((user) => {
        if (user) {
          if (user.resources.golds >= 30 && user.resources.foods >= 30) {
            const resources = user.resources;
            resources.golds -= 30;
            resources.foods -= 30;
            return User.updateOne({
              _id: req._userId
            }, {
              resources: resources
            })
          } else {
            throw 'NOT ENOUGH';
          }
        } else {
          throw 'NOT_FOUND';
        }
      })
      .then((_) => {
        const {
          nameFarm
        } = req.body;
        const farm = new Farm({
          _userId: req._userId,
          nameFarm
        });
        return farm.save();
      })
      .then((farm) => {
        res.status(200).json({
          message: 'ok succes',
          data: farm
        });
      })
      .catch(next);

    // res.status(200).json({message:'ok'});
  }

  //get list farmA
  static getListFarm(req, res, next) {
    Farm.find({
        _userId: req._userId
      })
      .then((farm) => {
        res.status(200).json({
          success: true,
          data: farm
        });
      })
      .catch(next);
  }

  //get by id
  static getIdByFarm(req, res, next) {
    const {
      id
    } = req.params;
    Farm.findById({
        id: _id
      })
      .then((farms) => {
        if (farms) {
          const golds = Math.floor((Date.now() - farms.lastCollected) / 60000);
          res.status(200).json({
            success: true,
            data: farms,
            golds: soliders > 10 ? 10 : farms,
          });
        } else {
          throw 'NOT_FOUND';
        }
      })
      .catch(next);
  }

  //put edit farm
  static putFarm(req, res, next) {
    const {
      id
    } = req.params;
    const {
      nameFarm
    } = req.body;
    Farm.findById(id)
      .then((farms) => {
        if (farms) {
          farms.nameFarm = nameFarm;
          return farms.save();
        } else {
          throw 'NOT_FOUND';
        }
      })
      .then((farms) => {
        res.status(200).json({
          succes: true,
          data: farms
        });
      })
      .catch(next);
  }

  //delete farm
  static deleteFarm(req, res, next) {
   const {id} = req.params;
   Farm.findById(id)
   .then((farms) => {
     if(farms) {
       return farms.remove()
     }else {
       throw 'NOT_FOUND'
     }
   })
   .then((farms) =>{
    res.status(200).json({success:true, message:'marked delete your Farm'})
   })
   .catch(next);
  }

  //Farm Collection
  static collect(req, res, next) {
    const {
      id
    } = req.params;
    let soliders;
    Farm.findById(id)
      .then((farms) => {
        if (farms) {
          golds = Math.floor((Date.now() - farms.lastCollected) / 60000);
          golds = golds > 50 ? 50 : golds; //
          farms.lastCollected = Date.now();
          return farms.save();
        } else {
          throw 'NOT_FOUND';
        }
      })
      .then((farms) => {
        return User.findById(req._id);
      })
      .then((user) => {
        const resources = user.resources;
        resources.golds += golds;
        return User.updateOne({
          _id: req._id
        }, {
          resources: resources
        });
      })
      .then((result) => {
        res.status(200).json({
          success: true,
          message: `${soliders} soliders has been added to your resources`,
        });
      })
      .catch(next);
  }
}

module.exports = FarmController;