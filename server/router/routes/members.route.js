const router = require('express').Router();
const memberCtrl = require('../../controllers/members.controller');

/* All routes are preceeded with `/api/members` */

router.get('/', memberCtrl.list);
router.post('/', memberCtrl.add);

router.get('/:id', memberCtrl.get);
router.put('/:id', memberCtrl.update);
router.delete('/:id', memberCtrl.delete);

router.get('/:id/rentals', memberCtrl.listRentals);

module.exports = router;