import React, { Component } from 'react';
import axios from 'axios';

export default class CarHistory extends Component {

	constructor(props) {
		super(props);
		this.state = {
			history: []
		}
	}

	componentDidMount() {
		const vin = this.props.match.params.vin;
		let _this = this;
		axios.get(`/api/cars/${vin}/history`)
			.then((response) => {
				_this.setState({
					history: response.data
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		return (
			<h1>Car History: {this.props.match.params.vin}</h1>
		);
	}

}