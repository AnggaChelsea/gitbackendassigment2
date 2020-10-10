const barrack = require('../models/Barrack');
const User = require('../models/User');

class Barrack{
    static post(req, res, next) {
        User.findById({_userId: req.params.id})
    }
}