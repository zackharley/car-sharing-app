import './Car.scss';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

export default class Car extends Component {

	constructor(props) {
		super(props);
		this.state = {
			car: {}
		};
	}

	componentDidMount() {
		let _this = this;
		let vin = this.props.match.params.vin;
		let url = `/api/cars/${vin}`;
		axios.get(url)
			.then((response) => {
				let car = response.data[0];
				_this.setState({ car });
			})
			.catch((error) => {
				console.error(error);
			})
	}

	handleReserveCar(e) {
		console.log('Reserving car');
	}

	handleHistoryClick(e) {
		let vin = this.props.match.params.vin;
		this.props.history.push(`/cars/${vin}/history`);
	}

	render() {
		return (
			<section>
				<h1>{this.props.match.params.vin}</h1>
				<Button onClick={this.handleReserveCar.bind(this)}>Reserve Car</Button>
				<Button onClick={this.handleHistoryClick.bind(this)}>See Reservation History</Button>
			</section>
		);
	}

}