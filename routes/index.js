const router = require('express').Router();
const authentication = require('../middlewares/authentication');
const userRoutes = require('./user');
const townhall = require('./townhall')
const market = require('./marketRouter')
const attack = require('./attack')
const barrack = require('./barrack')

const errorHandler = require('../middlewares/errorHandler');

router.use('/users', userRoutes);
router.use(authentication);
router.use(townhall);
router.use('/markets', market);
router.use('/barrack', barrack)
router.use('/attack', attack);
router.use(errorHandler);

module.exports = router;