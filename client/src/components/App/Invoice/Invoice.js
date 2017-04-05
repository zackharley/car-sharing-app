import React, { Component } from 'react';
import axios from 'axios';

export default class Invoice extends Component {

	constructor(props) {
		super(props);
		this.state = {
			invoice: {}
		}
	}

	componentDidMount() {
		let _this = this;
		axios.get('/api/invoice')
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		return (
			<h1>Invoice</h1>
		);
	}

}