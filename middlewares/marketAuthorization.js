const Market = require('../models/Marketuser');

module.exports = (req, res, next) => {
  Market.findOne({
      _id: req.params.id
    })
    .then((market) => {
      if (market) {
        if (market._userId.toString() === req._userId) {
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