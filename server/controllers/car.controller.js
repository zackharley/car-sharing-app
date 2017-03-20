module.exports = {

	list(req, res, next) {
		res.send('Here are all of the cars');
	},

	add(req, res, next) {
		res.send('Adding a car');
	},

	get(req, res, next) {
		const carId = req.params.car;
		res.send(`Looking for info for car #${carId}`);
	}

}