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
		connection.query(addQuery, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	},
}
