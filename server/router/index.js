const router = require('express').Router();
const cars = require('./routes/cars.route');

router.use('/cars', cars);

module.exports = router;