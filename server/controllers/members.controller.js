const connection = require('../db');
const queryGenerator = require('../services/query-generator');

module.exports = {

	list(req, res, next) {
		console.log('Hittign it');
		connection.query('SELECT * FROM member', (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	},

	add(req, res, next) {
		const addMemberQuery = queryGenerator.insert('member', req.body);
		connection.query(addMemberQuery, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	},

	get(req, res, next) {
		const id = req.params.id;
		connection.query(`SELECT * FROM member WHERE MemberID=${id}`, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	},

	update(req, res, next) {
		const id = req.params.id;
		let newMemberData = req.body;
		if(newMemberData.MemberID) {
			delete newMemberData.ID;
		}

		const updateMemberQuery = queryGenerator.update('member', `MemberID="${id}"`, newMemberData);

		connection.query(updateMemberQuery, (error, result) => {
			if(error) {
				next(error);
			} else {
				res.send(result);
			}
		});
	},

	delete(req, res, next) {

	}

}