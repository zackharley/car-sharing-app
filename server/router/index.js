const router = require('express').Router();
const cars = require('./routes/cars.route');
const members = require('./routes/members.route');

/* All routes are preceeded with `/api` */

router.use('/cars', cars);
router.use('/members', members)

module.exports = router;