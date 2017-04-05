const router = require('express').Router();
const locationsCtrl = require('../../controllers/locations.controller');

router.get('/', locationsCtrl.list);

module.exports = router;