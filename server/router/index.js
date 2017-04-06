const router = require('express').Router();
const cars = require('./routes/cars.route');
const members = require('./routes/members.route');
const locations = require('./routes/locations.route');
const invoice = require('./routes/invoice.route');
const reservation = require('./routes/reservation.route');
const pickup = require('./routes/pickup.route');
const dropoff = require('./routes/dropoff.route');

/* All routes are preceeded with `/api` */

router.use('/cars', cars);
router.use('/members', members)
router.use('/locations', locations);
router.use('/reservation', reservation);
router.use('/invoice', invoice);
router.use('/pickup', pickup)
router.use('/dropoff', dropoff)

module.exports = router;
