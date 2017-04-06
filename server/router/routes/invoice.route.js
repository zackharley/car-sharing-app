const router = require('express').Router();
const invoiceCtrl = require('../../controllers/invoice.controller');

router.get('/:memberId', invoiceCtrl.display);

module.exports = router;