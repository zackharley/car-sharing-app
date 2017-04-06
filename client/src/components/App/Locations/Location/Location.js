import React, { Component } from 'react';
import axios from 'axios';
import {Panel, Table, Col} from 'react-bootstrap';
import moment from 'moment';

export default class Location extends Component {

	constructor(props) {
		super(props);
		this.state = {
			locations: []
		};
	}

	componentDidMount() {
		let _this = this;
		axios.get(`/api/locations/${this.props.match.params.id}/carData`)
			.then((response) => {
				this.setState({locations: response.data});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		let locations = this.state.locations;
		let tableData = [];

		console.log(locations);

		for(var location in locations) {

			tableData.push(
				<tr key={location}>
					<td id={location}>{ locations[location].VIN }</td>
					<td id={location}>{ locations[location].Make }</td>
					<td id={location}>{ locations[location].Model }</td>
					<td id={location}>{ locations[location].ReservationID }</td>
					<td id={location}>{ locations[location].MemberID }</td>
					<td id={location} >{ moment(locations[location].PickupDate).format("DD/MM/YYYY") }</td>
					<td id={location} >{ moment(locations[location].DropOffDate).format("DD/MM/YYYY") }</td>
				</tr>
			);
		}

		return (
			<Col mdOffset={2} md={8}>
				<Panel>
					<h1>Location {this.props.match.params.id}</h1>
					<h4>Find all the locations for KTCS below.</h4>

					<Table striped bordered condensed hover>
						<thead>
							<tr>
								<th>VIN</th>
								<th>Car Make</th>
								<th>Car Model</th>
								<th>ReservationID</th>
								<th>MemberID</th>
								<th>Pickup Date</th>
								<th>Drop-Off Date</th>
							</tr>
						</thead>
						<tbody>
							{ tableData }
						</tbody>
					</Table>
				</Panel>
			</Col>
		);
	}

}
