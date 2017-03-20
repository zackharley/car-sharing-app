const router = require('express').Router();
const carCtrl = require('../../controllers/car.controller');

router.get('/', carCtrl.list);

router.post('/', carCtrl.add);

router.get('/:car', carCtrl.get);

module.exports = router;