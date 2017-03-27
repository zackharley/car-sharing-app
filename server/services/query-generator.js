module.exports = {
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
	}
};