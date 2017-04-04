import './Cars.scss';
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { Grid, Row, Col, Table } from 'react-bootstrap';

export default class Cars extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cars: [],
			filteredCars: [],
			filters: {
				pickUpDate: null,
				dropOffDate: null
			}
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
		let pickUpDate = this.state.filters.pickUpDate;
		let dropOffDate = this.state.filters.dropOffDate;

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
		this.props.history.push(`/app/cars/${vin}`);
	}

	render() {
		return (
			<section className='cars'>
				<form>
					<label htmlFor='cars__pick-up'>Pick a pick-up date</label>
					<input
						id='cars__pick-up'
						type='date'
						onChange={this.handlePickUpDateChange.bind(this)}
					/>
					<label htmlFor='cars__drop-off'>Pick a drop-off date</label>
					<input
						id='cars__drop-off'
						type='date'
						onChange={this.handleDropOffDateChange.bind(this)}
					/>
					<input
						type='submit'
						onClick={this.handleApplyFilterClick.bind(this)}
						value='Apply Filter'
					/>
				</form>
				<Grid>
					<Row>
						<Col>
							<Table bordered>
								<thead>
									<tr>
										<th>Make</th>
										<th>Model</th>
										<th>Year</th>
										<th>Mileage</th>
										<th>Price per Day</th>
									</tr>
								</thead>
								<tbody>
									{this.state.filteredCars.map((car) => {
										return (
											<tr
												id={car.VIN}
												key={car.VIN}
												onClick={this.handleTableRowClick.bind(this)}
											>
												<td>{car.Make}</td>
												<td>{car.Model}</td>
												<td>{car.Year}</td>
												<td>{car.Odometer}</td>
												<td>{car.DailyFee}</td>
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