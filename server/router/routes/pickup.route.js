const router = require('express').Router();
const pickupCtrl = require('../../controllers/pickup.controller');

router.post('/', pickupCtrl.add);

module.exports = router;
