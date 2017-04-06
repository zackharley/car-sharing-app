const router = require('express').Router();
const commentCntrl = require('../../controllers/rentalcomment.controller');

router.get('/:rentalID', commentCntrl.get);
router.post('/', commentCntrl.post);
router.put('/:rentalID', commentCntrl.update);

module.exports = router;
