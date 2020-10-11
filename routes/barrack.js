const router = require('express').Router();
const BarrackController = require('../controllers/BarrackController');
const barrackAuthorization = require('../middlewares/barrackAuthorization');

router.post('/', BarrackController.post);
router.get('/', BarrackController.get);
router.post('/:id', barrackAuthorization, BarrackController.barrackcollected);
router.post('/:id', barrackAuthorization, BarrackController.post);

module.exports = router;