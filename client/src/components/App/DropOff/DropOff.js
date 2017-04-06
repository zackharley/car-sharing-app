import React, { Component } from 'react';
import axios from 'axios';
import {Panel, Table, Col, Well, Form, FormGroup, FormControl, Button, ControlLabel} from 'react-bootstrap';
import moment from 'moment';

export default class DropOff extends Component {

	constructor(props) {
		super(props);
		this.state = {
			ReservationID: ''
		};
	}

	componentDidMount() {

	}

	pickup() {
		let formData = {
			ReservationID: this.state.ReservationID,
			Odometer: Math.floor(Math.random() * 90999),
			Time: moment().format('hh:mm:ss'),
			Status: 'normal'
		};

		let _this = this;
		axios.post('/api/dropoff', formData)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => {
				// Somehow figure out what the error was
				alert(error);
				console.log(error);
			});

		axios.get(`/api/reservation/${this.state.ReservationID}/`)
			.then((response) => {
				let VIN = response.data[0].vin;
				let data = {
					CurrentlyRented: 0,
					Odometer: Math.floor(Math.random() * 90999)
				};

				axios.put(`/api/cars/${response.data[0].VIN}/`, data)
					.then((response) => {
						console.log(response);
					})
					.catch((error) => {
						// Somehow figure out what the error was
						alert(error);
						console.log(error);
					});
			})
			.catch((error) => {
				// Somehow figure out what the error was
				alert(error);
				console.log(error);
			});

			let data2 = {
				Completed: 1
			};

			axios.put(`/api/reservation/${this.state.ReservationID}/`, data2)
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					// Somehow figure out what the error was
					alert(error);
					console.log(error);
				});
	}

	render() {
		return (
			<Col mdOffset={2} md={8}>
				<Panel>
					<h1>Drop Off A Ride</h1>
					<h4>Use the form below to dropoff your reservation.</h4>

					<Well>
						<Form horizontal>
					    <FormGroup controlId='formHorizontalEmail'>
					      	<Col componentClass={ControlLabel} sm={2}>
					        	Reservation ID
					      	</Col>
					      	<Col sm={8}>
					        	<FormControl
					        		type='text'
					        		placeholder='Reservation ID Number'
					        		value={this.state.ReservationID}
					        		onChange={(e)=>this.setState({ReservationID: e.target.value})}
					        	/>
					      	</Col>
				    	</FormGroup>
					    <FormGroup>
				      	<Col smOffset={2} sm={1}>
				        	<Button bsStyle='primary' onClick={()=>{this.pickup()}}>
				          		Pickup
				        	</Button>
				      	</Col>
					    </FormGroup>
					  </Form>
					</Well>
				</Panel>
			</Col>
		);
	}

}
