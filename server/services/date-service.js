module.exports = {
	
	isValidDate(date) {
		const dateRegExp = /^2\d{3}-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])$/;
		return dateRegExp.test(date);
	}

}