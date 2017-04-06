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

	lookAt(e) {
		this.props.history.push(`/locations/${Number(e.target.id) + 1}`);
	}

	render() {
		let locations = this.state.locations;
		let tableData = [];

		for(var location in locations) {
			tableData.push(
				<tr key={location}>
					<td id={location} onClick={(e)=>this.lookAt(e)}>{ locations[location].StreetNum }</td>
					<td id={location} onClick={(e)=>this.lookAt(e)}>{ locations[location].StreetName }</td>
					<td id={location} onClick={(e)=>this.lookAt(e)}>{ locations[location].City }</td>
					<td id={location} onClick={(e)=>this.lookAt(e)}>{ locations[location].Province }</td>
					<td id={location} onClick={(e)=>this.lookAt(e)}>{ locations[location].PostalCode }</td>
					<td id={location} onClick={(e)=>this.lookAt(e)}>{ locations[location].NumSpaces }</td>
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
