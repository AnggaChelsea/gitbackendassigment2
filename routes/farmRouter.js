const router = require('express').Router();
const FarmController = require('../controllers/FarmController')
const farmAuthorization = require('../middlewares/farmAuthorization')

router.post('/create', FarmController.post);
router.get('/', FarmController.getListFarm)
router.get('/:id', farmAuthorization, FarmController.getIdByFarm);
router.put('/:id', farmAuthorization, FarmController.putFarm);
router.delete('/:id', farmAuthorization, FarmController.deleteFarm);
// router.get('/:id/collect', farmAuthorization, FarmController.collect);



module.exports = router;