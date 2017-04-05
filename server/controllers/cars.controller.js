const connection = require('../db');
const queryGenerator = require('../services/query-generator');
const dateService = require('../services/date-service');

module.exports = {

	// GET `/api/cars`
	list(req, res, next) {
		connection.query('SELECT * FROM car', (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	},

	// POST `/api/cars`
	add(req, res, next) {
		const addCarQuery = queryGenerator.insert('car', req.body);
		connection.query(addCarQuery, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	},

	// GET `/api/cars/available`
	available(req, res, next) {
		const pickUpDate = req.query.pickup;
		const dropOffDate = req.query.dropoff;

		if(dateService.isValidDate(pickUpDate) && dateService.isValidDate(dropOffDate)) {
			const getAvailableCarsQuery = queryGenerator.carsAvailableOverRange(pickUpDate, dropOffDate);
			connection.query(getAvailableCarsQuery, (error, response) => {
				if(error) {
					next(error);
				} else {
					res.send(response);
				}
			});
		} else {
			next({
				message: 'You must supply a pick date and a drop off date, both in the format "YYYY-MM-DD"',
				status: 400
			});
		}
	},

	// GET `/api/cars/:vin`
	get(req, res, next) {
		const vin = req.params.vin;
		connection.query(`SELECT * FROM car WHERE VIN="${vin}"`, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	},

	// GET `/api/cars/:vin/history`
	getHistory(req, res, next) {
		const vin = req.params.vin;
		connection.query(`SELECT * FROM reservation WHERE VIN="${vin}"`, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	},

	// PUT `/api/cars/:vin`
	update(req, res, next) {
		const vin = req.params.vin;
		let newCarData = req.body;
		if(newCarData.VIN) {
			delete newCarData.VIN;
		}

		const updateCarQuery = queryGenerator.update('car', `VIN="${vin}"`, newCarData);

		connection.query(updateCarQuery, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	},

	// DELETE `/api/cars/:vin`
	delete(req, res, next) {
		const vin = req.params.vin;

		connection.query(`DELETE FROM car WHERE VIN="${vin}"`, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	}

}