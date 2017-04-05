const router = require('express').Router();
const carsCtrl = require('../../controllers/cars.controller');

/* All routes are preceeded with `/api/cars` */

router.get('/', carsCtrl.list);
router.post('/', carsCtrl.add);

router.get('/available', carsCtrl.available);

router.get('/:vin', carsCtrl.get);
router.get('/:vin/history', carsCtrl.getHistory);
router.put('/:vin', carsCtrl.update);
router.delete('/:vin', carsCtrl.delete);

module.exports = router;