import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

export default class DailyReservations extends Component {

	constructor(props) {
		super(props);
		let now = moment().format('YYYY-MM-DD');
		console.log(now);
		this.state = {
			date: now,
			reservations: []
		};
	}

	componentDidMount() {
		let _this = this;
		let date = this.props.match.params.date;

		axios.get(`/api/reservation?date=${date}`)
			.then((response) => {
				_this.setState({
					reservations: response.data
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		return (
			<section />
		);
	}

}