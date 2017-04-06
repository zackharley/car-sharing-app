import React, { Component } from 'react';
import axios from'axios';
import { Grid, Row, Col, Table } from 'react-bootstrap';

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
				<Grid>
					<Row>
						<Col>
							<Table bordered>
								<thead>
									<tr>
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
						</Col>
					</Row>
				</Grid>
			</section>
		);
	}

}