import React, { Component } from 'react';
import axios from'axios';
import { Col, Panel, Table } from 'react-bootstrap';
import auth from '../../../util/auth';

export default class Rentals extends Component {

	constructor(props) {
		super(props);
		this.state = {
			rentals: [],
			currentUser: auth.getCurrentUser()
		};
	}

	componentDidMount() {
		let _this = this;
		axios.get(`/api/members/${this.state.currentUser}/rentals`)
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
			<Col mdOffset={2} md={8}>
				<Panel>
					<h1>My Rental History</h1>
					<h4>These are all of your rentals.</h4>

					<Table striped bordered condensed hover>
						<thead>
							<tr>
								<th>Reservation ID</th>
								<th>Access Code</th>
								<th>Car Make</th>
								<th>Car Model</th>
								<th>Car Year</th>
								<th>Pick Up Date</th>
								<th>Drop Off Date</th>
							</tr>
						</thead>
						<tbody>
							{this.state.rentals.map((rental) => {
								const pickUpDate = new Date(rental.PickupDate);
								const dropOffDate = new Date(rental.DropOffDate);
								return (
									<tr key={rental.ReservationID}>
										<td>{rental.ReservationID}</td>
										<td>{rental.AccessCode}</td>
										<td>{rental.Make}</td>
										<td>{rental.Model}</td>
										<td>{rental.Year}</td>
										<td>{pickUpDate.toLocaleDateString()}</td>
										<td>{dropOffDate.toLocaleDateString()}</td>
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