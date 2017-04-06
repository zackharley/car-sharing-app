const router = require('express').Router();
const reservationControl = require('../../controllers/reservation.controller');

/* All routes are preceeded with `/api/reservation` */

router.get('/', reservationControl.list);
router.post('/', reservationControl.add);
router.get('/adminAll', reservationControl.getAll);
router.get('/:id', reservationControl.get);
router.put('/:id', reservationControl.update);
router.get('/date/:date', reservationControl.specificDate);

module.exports = router;
