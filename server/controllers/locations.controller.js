const connection = require('../db');
const queryGenerator = require('../services/query-generator');

module.exports = {

	list(req, res, next) {
		const query = queryGenerator.list('parkinglocation');
		connection.query(query, (error, result) => {
			if(error) {
				next(error);
			} else {
				res.send(result);
			}
		})
	},

	// GET `/api/locations/:id`
	get(req, res, next) {
		const locationId = req.params.id;
		const query = `SELECT `;
		connection.query(query, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	},

	carData(req, res, next) {
		const locationId = req.params.id;
		const query = `SELECT car.VIN, car.Make, car.Model, reservation.ReservationID, reservation.MemberID, reservation.PickupDate, reservation.DropOffDate FROM car JOIN reservation on car.VIN = reservation.VIN WHERE reservation.Completed = 0 AND car.Location = ${locationId} AND DATEDIFF(CURDATE(), reservation.PickupDate) < 0`;
		connection.query(query, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	}
}
