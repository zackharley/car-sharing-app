import './Cars.scss';
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Col, Panel, Table, Button, Modal } from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import auth from '../../../util/auth.js';

import 'react-datepicker/dist/react-datepicker.css';

export default class Cars extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cars: [],
			filteredCars: [],
			filters: {
				pickUpDate: moment(),
				dropOffDate: moment()
			},
			bookModal: false,
			bookVIN: 0,
			startDate: moment(),
			endDate: moment()
		};
	}

	componentDidMount() {
		let _this = this;
		axios.get('/api/cars')
			.then((response) => {
				let cars = _this.prepareCars(response.data);
				_this.setState({
					cars,
					filteredCars: cars
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	prepareCars(cars) {
		const numberOfDecimalPlaces = 2;
		return cars.map((car) => {
			car.DailyFee = car.DailyFee.toFixed(numberOfDecimalPlaces);
			return car;
		});
	}

	handlePickUpDateChange(e) {
		const pickUpDate = e.target.value;
		const dropOffDate = this.state.filters.dropOffDate;

		this.setState({
			filters: {
				pickUpDate,
				dropOffDate
			}
		});
	}

	handleDropOffDateChange(e) {
		const pickUpDate = this.state.filters.pickUpDate;
		const dropOffDate = e.target.value;

		this.setState({
			filters: {
				pickUpDate,
				dropOffDate
			}
		});
	}

	handleApplyFilterClick(e) {
		let pickUpDate = moment(this.state.filters.pickUpDate).format("YYYY-MM-DD");
		let dropOffDate =  moment(this.state.filters.dropOffDate).format("YYYY-MM-DD");

		e.preventDefault();

		if(pickUpDate && dropOffDate) {
			let url = `/api/cars/available?pickup=${pickUpDate}&dropoff=${dropOffDate}`;
			console.log(url);
			let _this = this;
			axios.get(url)
				.then((response) => {
					let bookedCarVins = response.data.map((car) => {
						return car.VIN;
					});

					console.log(bookedCarVins);

					let filteredCars = this.state.cars.filter((car) => {
						return !bookedCarVins.includes(car.VIN);
					});

					_this.setState({
						filteredCars
					});
				})
				.catch((error) => {
					console.error(error);
				})
		} else {
			this.setState({
				filteredCars: this.state.cars
			});
		}
	}

	handleTableRowClick(e) {
		const vin = e.currentTarget.id;
		this.props.history.push(`/cars/${vin}`);
	}

	bookCar(e) {
	 	this.setState({
			showModal: true,
			bookVIN: e.target.id
		 });
	}

	bookSend() {
		this.setState({
			showModal: false
		 });

 		let formData = {
			MemberID: auth.getCurrentUser(),
			VIN: this.state.bookVIN,
			AccessCode: Math.floor(Math.random() * 9999),
			Completed: 0,
			PickupDate: moment(this.state.startDate).format(),
			DropOffDate: moment(this.state.endDate).format()
		};

		console.log(formData);

 		let _this = this;
 		axios.post('/api/reservation', formData)
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
			<section className='cars'>
				<Modal show={this.state.showModal} onHide={()=>this.setState({ showModal: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Book Your Car</h4>

						<p>Pickup Date</p>
						<DatePicker
							selected={this.state.startDate}
							onChange={(e)=>this.setState({pickUpDate: e})}
						 />

						<p>Drop-Off Date</p>
						<DatePicker
							selected={this.state.endDate}
							onChange={(e)=>this.setState({dropOffpDate: e})}
						 />
          </Modal.Body>
          <Modal.Footer>
						<Button bsStyle="success" onClick={()=>this.bookSend()}>Book</Button>
            <Button onClick={()=>this.setState({ showModal: false })}>Close</Button>
          </Modal.Footer>
        </Modal>

				<Col mdOffset={2} md={8}>
					<form>
						<label htmlFor='cars__pick-up'>Pickup Date</label>
						<DatePicker
							selected={this.state.startDate}
							onChange={(e)=>this.setState({startDate: e})}
						 />

						<label htmlFor='cars__pick-up'>Drop-Off Date</label>
						<DatePicker
							selected={this.state.endDate}
							onChange={(e)=>this.setState({endDate: e})}
						 />

						 <Button onClick={this.handleApplyFilterClick.bind(this)}>Apply Filter</Button>
					</form>


				</Col>

				<Col mdOffset={2} md={8}>
					<Panel>
						<h1>Cars</h1>
						<h4>Here is a list of cars.</h4>

						<Table striped bordered condensed hover>
							<thead>
								<tr>
									<th>Make</th>
									<th>Model</th>
									<th>Year</th>
									<th>Mileage</th>
									<th>Price per Day</th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{this.state.filteredCars.map((car) => {
									return (
										<tr
											id={car.VIN}
											key={car.VIN}
										>
											<td onClick={this.handleTableRowClick.bind(this)}>{car.Make}</td>
											<td onClick={this.handleTableRowClick.bind(this)}>{car.Model}</td>
											<td onClick={this.handleTableRowClick.bind(this)}>{car.Year}</td>
											<td onClick={this.handleTableRowClick.bind(this)}>{car.Odometer}</td>
											<td onClick={this.handleTableRowClick.bind(this)}>{car.DailyFee}</td>
											<td><Button bsStyle="primary" id={car.VIN} onClick={(e)=>this.bookCar(e)}>Book</Button></td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</Panel>
				</Col>
			</section>
		);
	}

}
