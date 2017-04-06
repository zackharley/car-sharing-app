const connection = require('../db');
const queryGenerator = require('../services/query-generator');
const moment = require('moment');

module.exports = {

	list(req, res, next) {
		let date = req.query.date;
  		if(date) {
  			query = `SELECT * FROM reservation WHERE DATEDIFF("${date}", PickupDate) >= 0 && DATEDIFF(DropOffDate, "${date}") >= 0`;
  		} else {
			query = `SELECT * FROM reservation`;
  		}

		console.log(query);

		connection.query(query, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	},

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
		connection.query(`SELECT reservation.ReservationID, reservation.MemberID, reservation.VIN, reservation.AccessCode, reservation.PickupDate, reservation.DropOffDate, car.Make, car.Model, car.Year from reservation JOIN car ON reservation.VIN = car.VIN WHERE ReservationID=${id}`, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	},

  getAll(req, res, next) {
    connection.query(`SELECT reservation.ReservationID, reservation.MemberID, reservation.VIN, reservation.AccessCode, reservation.PickupDate, reservation.DropOffDate, car.Make, car.Model, car.Year from reservation JOIN car ON reservation.VIN = car.VIN;`, (error, response) => {
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
  },

	specificDate(req, res, next) {
		const date = req.params.date;
		connection.query(`SELECT reservation.ReservationID, reservation.MemberID, reservation.VIN, reservation.AccessCode, reservation.PickupDate, reservation.DropOffDate, car.Make, car.Model, car.Year from reservation JOIN car ON reservation.VIN = car.VIN WHERE reservation.PickupDate LIKE '${date}'`, (error, response) => {
			if(error) {
				next(error);
			} else {
				res.send(response);
			}
		});
	},
}
