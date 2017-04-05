const router = require('express').Router();
const cars = require('./routes/cars.route');
const members = require('./routes/members.route');
const locations = require('./routes/locations.route');
const invoice = require('./routes/invoice.route');

/* All routes are preceeded with `/api` */

router.use('/cars', cars);
router.use('/members', members)
router.use('/locations', locations);

router.use('/invoice', invoice);

module.exports = router;