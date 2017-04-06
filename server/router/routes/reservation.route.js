const router = require('express').Router();
const reservationControl = require('../../controllers/reservation.controller');

/* All routes are preceeded with `/api/members` */

router.post('/', reservationControl.add);
router.get('/:id', reservationControl.get);
router.put('/:id', reservationControl.update);

module.exports = router;
