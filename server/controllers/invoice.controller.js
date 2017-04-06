const connection = require('../db');
const queryGenerator = require('../services/query-generator');

module.exports = {

	display(req, res, next) {
		let { memberId } = req.params;
		const query = queryGenerator.invoice(memberId);
		connection.query(query, (error, repsonse) => {
			if(error) {
				next(error);
			} else {
				res.send(repsonse);
			}
		})
	}

};