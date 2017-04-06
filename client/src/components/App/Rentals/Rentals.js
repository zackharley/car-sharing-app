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

		if(auth.isAdmin() === 1) {
			axios.get(`/api/reservation`)
				.then((response) => {
					console.log(response.data);
					_this.setState({
						rentals: response.data
					});
				})
				.catch((error) => {
					console.error(error);
				})
		} else {
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
	}

	checkRental(e) {
		this.props.history.push(`/member/${this.state.currentUser}/rentals/${Number(e.target.id)}`);
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
									<tr onClick={(e)=>this.checkRental(e)} key={rental.ReservationID}>
										<td id={rental.ReservationID}>{rental.ReservationID}</td>
										<td id={rental.ReservationID}>{rental.AccessCode}</td>
										<td id={rental.ReservationID}>{rental.Make}</td>
										<td id={rental.ReservationID}>{rental.Model}</td>
										<td id={rental.ReservationID}>{rental.Year}</td>
										<td id={rental.ReservationID}>{pickUpDate.toLocaleDateString()}</td>
										<td id={rental.ReservationID}>{dropOffDate.toLocaleDateString()}</td>
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
