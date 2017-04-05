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
	}

}