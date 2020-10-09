const router = require('express').Router();
const TownhallController = require('../controllers/TownhallController');

router.get('/', TownhallController.get);

module.exports = router;
