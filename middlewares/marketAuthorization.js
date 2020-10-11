const Market = require('../models/Marketuser');

module.exports = (req, res, next) => {
  Market.findOne({
      _id: req.params._id
    })
    .then((market) => {
      if (market) {
        if (market._userId.toString() === req._id) {
          next();
        } else {
          throw 'FORBIDDEN';
        }
      } else {
        throw 'NOT_FOUND';
      }
    })
    .catch(next);
};