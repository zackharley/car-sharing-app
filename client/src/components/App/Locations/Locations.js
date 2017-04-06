import React, { Component } from 'react';
import axios from 'axios';
import {Panel, Table, Col} from 'react-bootstrap';

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
		let locations = this.state.locations;
		let tableData = [];

		for(var location in locations) {
			tableData.push(
				<tr key={location}>
					<td>{ locations[location].StreetNum }</td>
					<td>{ locations[location].StreetName }</td>
					<td>{ locations[location].City }</td>
					<td>{ locations[location].Province }</td>
					<td>{ locations[location].PostalCode }</td>
					<td>{ locations[location].NumSpaces }</td>
				</tr>
			);
		}

		return (
			<Col mdOffset={2} md={8}>
				<Panel>
					<h1>Locations</h1>
					<h4>Find all the locations for KTCS below.</h4>

					<Table striped bordered condensed hover>
						<thead>
							<tr>
								<th>Street Number</th>
								<th>Street Name</th>
								<th>City</th>
								<th>Province</th>
								<th>Postal Code</th>
								<th>Number of Spaces</th>
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
