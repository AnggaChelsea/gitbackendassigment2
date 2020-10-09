const Market = require('../models/Marketuser');
const User = require('../models/User');

class MarketController {
  static list(req, res, next) {
    Market.find({ _userId: req._id })
      .then((markets) => {
        res.status(200).json({ success: true, data: markets });
      })
      .catch(next);
  }

  static post(req, res, next) {
    console.log(req._id)
    User.findById({_userId: req._id})
      .then((user) => {
        if (user) {
          if (user.resources.golds >= 30 && user.resources.foods >= 10) {
            const resources = user.resources;
            console.log(resources)
            resources.golds -= 30;
            resources.foods -= 10;
            return User.updateOne({ _id: req._id }, { resources: resources });
          } else {
            throw 'NOT_ENOUGH';
          }
        } else {
          throw 'NOT_FOUND';
        }
      })
      .then((_) => {
        const { name } = req.body;
        const market = new Market({ _userId: req._id, name });
        return market.save();
      })
      .then((market) => {
        res.status(200).json({ success: true, data: market });
      })
      .catch(next);
  }
  
  static get(req, res, next) {
    const { id } = req.params;
    Market.findById(id)
      .then((market) => {
        if (market) {
          const golds = Math.floor((Date.now() - market.lastCollected) / 60000);
          res.status(200).json({
            success: true,
            data: market,
            golds: golds > 50 ? 50 : golds,
          });
        } else {
          throw 'NOT_FOUND';
        }
      })
      .catch(next);
  }

  static put(req, res, next) {
    const { id } = req.params;
    const { name } = req.body;
    Market.findById(id)
      .then((market) => {
        if (market) {
          market.name = name;
          return market.save();
        } else {
          throw 'NOT_FOUND';
        }
      })
      .then((market) => {
        res.status(200).json({ succes: true, data: market });
      })
      .catch(next);
  }

  static delete(req, res, next) {
    const { id } = req.params;
    Market.findById(id)
      .then((market) => {
        if (market) {
          return market.remove();
        } else {
          throw 'NOT_FOUND';
        }
      })
      .then((market) => {
        res
          .status(200)
          .json({ succes: true, message: 'Market deleted', data: market });
      })
      .catch(next);
  }

  static collect(req, res, next) {
    const { id } = req.params;
    let golds;
    Market.findById(id)
      .then((market) => {
        if (market) {
          golds = Math.floor((Date.now() - market.lastCollected) / 60000);
          golds = golds > 50 ? 50 : golds; //
          market.lastCollected = Date.now();
          return market.save();
        } else {
          throw 'NOT_FOUND';
        }
      })
      .then((market) => {
        return User.findById(req._id);
      })
      .then((user) => {
        const resources = user.resources;
        resources.golds += golds;
        return User.updateOne({ _id: req._id }, { resources: resources });
      })
      .then((result) => {
        res.status(200).json({
          success: true,
          message: `${golds} golds has been added to your resources`,
        });
      })
      .catch(next);
  }
}

module.exports = MarketController;
