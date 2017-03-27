const router = require('express').Router();
const carsCtrl = require('../../controllers/cars.controller');

/* All routes are preceeded with `/api` */

router.get('/', carsCtrl.list);
router.post('/', carsCtrl.add);

router.get('/:vin', carsCtrl.get);
router.put('/:vin', carsCtrl.update);
router.delete('/:vin', carsCtrl.delete);

module.exports = router;