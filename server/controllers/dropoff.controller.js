const connection = require('../db');
const queryGenerator = require('../services/query-generator');

module.exports = {
	add(req, res, next) {
		const addPickup = queryGenerator.insert('dropoff', req.body);
		console.log(addPickup);
		connection.query(addPickup, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	}
}
