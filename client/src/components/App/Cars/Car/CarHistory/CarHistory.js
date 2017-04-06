import React, { Component } from 'react';
import axios from 'axios';
import { Col, Panel, Table } from 'react-bootstrap';

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
			<Col mdOffset={2} md={8}>
				<Panel>
					<h1>Car History: ID#{this.props.match.params.vin}</h1>
					<h4>These are all of the rentals for this car.</h4>

					<Table striped bordered condensed hover>
						<thead>
							<tr>
								<th>Member ID</th>
								<th>Reservation ID</th>
								<th>Pick Up Time</th>
								<th>Drop Off Time</th>
							</tr>
						</thead>
						<tbody>
							{this.state.history.map((entry) => {
								return (
									<tr key={entry.ReservationID}>
										<th>{entry.MemberID}</th>
										<th>{entry.ReservationID}</th>
										<th>{new Date(entry.PickupDate).toLocaleDateString()}</th>
										<th>{new Date(entry.DropOffDate).toLocaleDateString()}</th>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</Panel>
			</Col>
		);
	}

}