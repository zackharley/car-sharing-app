const connection = require('../db');
const queryGenerator = require('../services/query-generator');

module.exports = {
	list(req, res, next) {
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
		console.log(addMemberQuery);
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

		connection.query(updateMemberQuery, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	},

	delete(req, res, next) {

	},

	listRentals(req, res, next) {
		const id = req.params.id;
		connection.query(`SELECT * FROM reservation JOIN car ON reservation.VIN=car.VIN WHERE MemberID=${id}`, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	},

	getLoginDetails(req, res, next) {
		const email = req.params.email;
		connection.query(`SELECT Passwd FROM member WHERE Email="${email}"`, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	}

}
