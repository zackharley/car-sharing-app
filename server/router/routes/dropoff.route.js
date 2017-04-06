const router = require('express').Router();
const dropCtrl = require('../../controllers/dropoff.controller');

router.post('/', dropCtrl.add);

module.exports = router;
