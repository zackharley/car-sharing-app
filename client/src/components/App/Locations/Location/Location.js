import React, { Component } from 'react';

export default class Location extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	componentDidMount() {
		const locationId = this.props.match.params.id;
		let _this = this;
		axios.get(`/api/locations/${locationId}`)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		return (
			<h1>{this.props.match.params.id}</h1>
		);
	}

}