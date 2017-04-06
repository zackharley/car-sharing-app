import React, { Component } from 'react';
import axios from 'axios';

export default class DamagedOrNotRunning extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cars: []
		}
	}

	componentDidMount() {
		let _this = this;
		axios.get('/api/cars/damaged-or-not-running')
			.then((response) => {
				_this.setState({
					cars: response.data
				});
			})
			.catch((error) => {
				console.error(error);
			})
	}

	render() {
		return (
			<section>
				{this.state.cars.map((car) => {
					return (
						<section>
							{car.toString()}
						</section>
					);
				})}
			</section>
		);
	}

}