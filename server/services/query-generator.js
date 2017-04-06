module.exports = {

	list(table) {
		return `SELECT * FROM ${table}`;
	},

	insert(table, object) {
		const keys = Object.keys(object);

		const fields = keys.map((key) => {
			return `${key}`
		}).join(',');

		const values = keys.map((key) => {
			return typeof object[key] === 'string' ? `"${object[key]}"` : object[key];
		}).join(',');

		return `INSERT INTO ${table} (${fields}) VALUES (${values})`;
	},

	update(table, conditional, object) {
		const keys = Object.keys(object);

		let updates = keys.map((key) => {
			return typeof object[key] === 'string' ? `${key}="${object[key]}"` : `${key}=${object[key]}`;
		}).join(',');

		return `UPDATE ${table} SET ${updates} WHERE ${conditional}`;
	},

	carsAvailableOverRange(pickUpDate, dropOffDate) {
		return `SELECT VIN FROM cars_and_reservations WHERE (DropOffDate >= "${pickUpDate}" && DropOffDate <= "${dropOffDate}") || (pickUpDate >= "${pickUpDate}" && pickUpDate <= "${dropOffDate}") || (pickUpDate <= "${pickUpDate}" && DropOffDate >= "${dropOffDate}")`;
	},

	invoice(memberId) {
		return `
			SELECT (IFNULL(SUM(DATEDIFF(reservation.DropoffDate, reservation.PickupDate) * car.DailyFee), 0) + member.MonthlyFee) AS Cost
			FROM member
			    LEFT JOIN reservation 
			        ON member.MemberID=reservation.MemberID
			    JOIN car
			        ON reservation.VIN=car.VIN
			WHERE member.MemberID=${memberId} && reservation.Completed=1 && DATEDIFF(CURDATE(),reservation.DropOffDate) <= 30
		`;
	}

};
