const router = require('express').Router();
const locationsCtrl = require('../../controllers/locations.controller');

router.get('/', locationsCtrl.list);
router.get('/:id/carData', locationsCtrl.carData);
router.get('/:id', locationsCtrl.get);

module.exports = router;
