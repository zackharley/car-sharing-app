const connection = require('../db');
const queryGenerator = require('../services/query-generator');
const dateService = require('../services/date-service');

module.exports = {

	// GET `/api/cars`
	list(req, res, next) {
		let filters = {};
		if(req.query.filters) {
			req.query.filters.split(',').forEach((filter) => {
				filters[filter] = true;
			});
		}

		let query;

		if(filters.needService && filters.damagedOrNotRunning) {
			query = 'SELECT cars_and_count.* FROM cars_and_count JOIN maintenancehist ON cars_and_count.VIN=maintenancehist.VIN WHERE (maintenancehist.Odometer - cars_and_count.Odometer) > 5000 && (CarStatus="damaged" || CarStatus="not running") GROUP BY cars_and_count.VIN';
		} else if(filters.needService) {
			query = 'SELECT cars_and_count.* FROM cars_and_count JOIN maintenancehist ON cars_and_count.VIN=maintenancehist.VIN WHERE (maintenancehist.Odometer - cars_and_count.Odometer) > 5000 GROUP BY cars_and_count.VIN';
		} else if(filters.damagedOrNotRunning) {
			query = 'SELECT * FROM cars_and_count WHERE CarStatus="damaged" || CarStatus="not running"';
		} else {
			query = 'SELECT * FROM cars_and_count';
		}

		connection.query(query, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	},

	// POST `/api/cars`
	add(req, res, next) {
		const query = queryGenerator.insert('car', req.body);
		console.log(query);
		connection.query(query, (error, response) => {
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
			connection.query(`SELECT VIN FROM cars_and_reservations WHERE (DropOffDate >= "${pickUpDate}" && DropOffDate <= "${dropOffDate}") || (pickUpDate >= "${pickUpDate}" && pickUpDate <= "${dropOffDate}") || (pickUpDate <= "${pickUpDate}" && DropOffDate >= "${dropOffDate}")`, (error, response) => {
				if(error) {
					next(error);
				} else {
					res.send(response);
				}
			});
	},

	// GET `/api/cars/damaged-or-not-running`
	damageOrNotRunning(req, res, next) {
		connection.query(`SELECT * FROM car WHERE CarStatus="damaged" || CarStatus="not running"`, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
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
