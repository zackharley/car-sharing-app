import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup, Col, FormControl, Button, ControlLabel, Well } from 'react-bootstrap';

import auth from '../../../../util/auth.js';

export default class AddCar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			vin: '',
			make: '',
			model: '',
			year: '',
			odometer: '',
			location: '',
			dailyFee: '',
			carStatus: '',
			_locations: []
		}
	}

	componentDidMount() {
		let _this = this;
		axios.get('/api/locations')
			.then((response) => {
				_this.setState({
					_locations: response.data
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	handleSubmit(e) {
		e.preventDefault();

		let formData = {
			VIN: this.state.vin,
			Make: this.state.make,
			Model: this.state.model,
			Year: this.state.year,
			Odometer: this.state.odometer,
			Location: this.state.location,
			DailyFee: this.state.dailyFee,
			CarStatus: this.state.carStatus,
			CurrentlyRented: 0
		};

		let _this = this;
		axios.post('/api/cars', formData)
			.then((response) => {;
				_this.props.history.push('/cars');
			})
			.catch((error) => {
				alert(error);
				console.log(error);
			});
	}

	render() {
		return (
			<Form horizontal>
				<FormGroup controlId="formHorizontalEmail">
				 	<Col componentClass={ControlLabel} sm={2}>
					 	VIN
 					</Col>
 					<Col sm={8}>
	 					<FormControl type="text" placeholder="VIN" onChange={(e)=>this.setState({vin: e.target.value})}/>
	 				</Col>
	 			</FormGroup>

				<FormGroup controlId="formHorizontalEmail">
					<Col componentClass={ControlLabel} sm={2}>
						Make
					</Col>
					<Col sm={8}>
						<FormControl type="text" placeholder="Make" onChange={(e)=>this.setState({make: e.target.value})}/>
					</Col>
				</FormGroup>

				<FormGroup controlId="formHorizontalEmail">
					<Col componentClass={ControlLabel} sm={2}>
						Model
					</Col>
					<Col sm={8}>
						<FormControl type="text" placeholder="Model" onChange={(e)=>this.setState({model: e.target.value})}/>
					</Col>
				</FormGroup>

				<FormGroup controlId="formHorizontalEmail">
					<Col componentClass={ControlLabel} sm={2}>
						Year
					</Col>
					<Col sm={8}>
						<FormControl type="number" placeholder="Year" onChange={(e)=>this.setState({year: e.target.value})}/>
					</Col>
				</FormGroup>

				<FormGroup controlId="formHorizontalEmail">
					<Col componentClass={ControlLabel} sm={2}>
						Odometer
					</Col>
					<Col sm={8}>
						<FormControl type="number" placeholder="Odometer" onChange={(e)=>this.setState({odometer: e.target.value})}/>
					</Col>
				</FormGroup>

				<FormGroup controlId="formHorizontalEmail">
					<Col componentClass={ControlLabel} sm={2}>
						Location
					</Col>
					<Col sm={8}>
						<FormControl
							componentClass='select'
							placeholder="Location" 
							onChange={(e)=>this.setState({location: e.target.value})}
						>
							{this.state._locations.map((location) => {
								return (
									<option
										key={location.LocationID}
										value={location.LocationID}
									>
										{location.StreetNum} {location.StreetName}, {location.City}, {location.Province}
									</option>
								);
							})}
						</FormControl>
					</Col>
				</FormGroup>

				<FormGroup controlId="formHorizontalEmail">
					<Col componentClass={ControlLabel} sm={2}>
						Daily Fee
					</Col>
					<Col sm={8}>
						<FormControl type="number" placeholder="Daily Fee" onChange={(e)=>this.setState({dailyFee: e.target.value})}/>
					</Col>
				</FormGroup>

				<FormGroup controlId="formHorizontalEmail">
					<Col componentClass={ControlLabel} sm={2}>
						Car Status
					</Col>
					<Col sm={8}>
						<FormControl
							componentClass="select"
							placeholder="Car Status"
							onChange={(e)=>this.setState({carStatus: e.target.value})}
						>
							<option value='normal'>Normal</option>
							<option value='damaged'>Damaged</option>
							<option value='not running'>Not Running</option>
						</FormControl>
					</Col>
				</FormGroup>

		 		<FormGroup>
			 		<Col smOffset={2} sm={1}>
				 		<Button bsStyle='success' type="submit" onClick={this.handleSubmit.bind(this)}>
					 		Add Car
				 		</Button>
			 		</Col>

			 		<Col sm={2}>
				 		<Button bsStyle='danger' type="submit" onClick={() => {this.props.history.push('/')}}>
					 		Go Home
				 		</Button>
			 		</Col>
		 		</FormGroup>
			</Form>
		);
	}
}
