import React, { Component } from 'react';
import axios from'axios';

const tempMember = {
	id: 1
};

export default class Rentals extends Component {

	constructor(props) {
		super(props);
		this.state = {
			rentals: []
		};
	}

	componentDidMount() {
		let _this = this;
		axios.get(`/api/members/${tempMember.id}/rentals`)
			.then((response) => {
				_this.setState({
					rentals: response.data
				});
			})
			.catch((error) => {
				console.error(error);
			})
	}

	render() {
		return (
			<section>
				<h1>Rentals</h1>
			</section>
		);
	}

}