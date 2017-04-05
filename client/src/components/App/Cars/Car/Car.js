import './Car.scss';
import React, { Component } from 'react';
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

	render() {
		return (
			<section>
				<h1>{this.props.match.params.vin}</h1>
				<button onClick={this.handleReserveCar.bind(this)}>Reserve Car</button>
			</section>
		);
	}

}