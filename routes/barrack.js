const router = require('express').Router();
const BarrackController = require('../controllers/BarrackController');
const barrackAuthorization = require('../middlewares/barrackAuthorization');

router.post('/', BarrackController.post);

module.exports = router;