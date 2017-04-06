const connection = require('../db');
const queryGenerator = require('../services/query-generator');

module.exports = {
	// GET `/api/rentalcomment/:id`
	get(req, res, next) {
    const id = req.params.rentalID;
		connection.query(`SELECT * FROM rentalcomments WHERE ReservationID="${id}"`, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	},

	post(req, res, next) {
		const addQuery = queryGenerator.insert('rentalcomments', req.body);
		console.log(addQuery);
		connection.query(addQuery, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	},

	update(req, res, next) {
		const id = req.params.rentalID;
		let data = req.body;

		if(data.ReservationID) {
			delete data.ReservationID;
		}

		const updateQuery = queryGenerator.update('rentalcomments', `ReservationID="${id}"`, data);

		connection.query(updateQuery, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	},
}
