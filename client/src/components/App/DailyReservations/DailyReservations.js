import React, { Component } from 'react';
import axios from 'axios';

export default class DailyReservations extends Component {

	constructor(props) {
		super(props);
		this.state = {
			date: 
		};
	}

	componentDidMount() {
		let _this = this;
		axios.get()
			.then((response) => {
				console.log(response);
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