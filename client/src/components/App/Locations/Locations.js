import React, { Component } from 'react';
import axios from 'axios';

export default class Locations extends Component {

	constructor(props) {
		super(props);
		this.state = {
			locations: []
		};
	}

	componentDidMount() {
		let _this = this;
		axios.get('/api/locations')
			.then((response) => {
				_this.setState({
					locations: response.data
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		return (
			<h1>Locations</h1>
		);
	}

}