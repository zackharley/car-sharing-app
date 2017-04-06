const connection = require('../db');
const queryGenerator = require('../services/query-generator');

module.exports = {
  add(req, res, next) {
		const addReserve = queryGenerator.insert('reservation', req.body);
		console.log(addReserve);
		connection.query(addReserve, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	},

  get(req, res, next) {
		const id = req.params.id;
		connection.query(`SELECT * FROM reservation WHERE ReservationID=${id}`, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	},

  update(req, res, next) {
    const id = req.params.id;
    let newData = req.body;

    const updateQuery = queryGenerator.update('reservation', `ReservationID="${id}"`, newData);

    connection.query(updateQuery, (error, response) => {
      if(error) {
        next(error);
      } else {
        res.send(response);
      }
    });
  }
}
