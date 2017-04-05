const connection = require('../db');

module.exports = {

	display(req, res, next) {
		const query = 'SELECT * FROM reservation';
		connection.query(query, (error, repsonse) => {
			if(error) {
				next(error);
			} else {
				res.send(repsonse);
			}
		})
	}

};