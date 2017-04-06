import './Cars.scss';
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { Grid, Row, Col, Table } from 'react-bootstrap';

export default class AdminCars extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cars: [],
			filters: {
				damagedOrNotRunning: false,
				needService: false,
				totalReservationsOrder: ''
			}
		};
	}

	componentDidMount() {
		let _this = this;
		axios.get('/api/cars')
			.then((response) => {
				let cars = _this.prepareCars(response.data);
				_this.setState({
					cars
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

	handleDamagedOrNotRunningClick(e) {
		this.setState({
			filters: {
				damagedOrNotRunning: !this.state.filters.damagedOrNotRunning,
				needService: this.state.filters.needService,
				totalReservationsOrder: this.state.filters.totalReservationsOrder
			}
		})
	}

	handleNeedServiceClick(e) {
		this.setState({
			filters: {
				damagedOrNotRunning: this.state.filters.damagedOrNotRunning,
				needService: !this.state.filters.needService,
				totalReservationsOrder: this.state.filters.totalReservationsOrder
			}
		})
	}

	handleTotalReservationsOrderChange(e) {
		this.setState({
			filters: {
				damagedOrNotRunning: this.state.filters.damagedOrNotRunning,
				needService: this.state.filters.needService,
				totalReservationsOrder: e.target.value
			}
		});
	}

	handleApplyFilterClick(e) {
		e.preventDefault();

		let url = '/api/cars';

		if(this.state.filters.damagedOrNotRunning || this.state.filters.needService) {
			const filters = Object.keys(this.state.filters).filter((filter) => {
				return this.state.filters[filter];
			}).join(',');
			url += `?filters=${filters}`;
		}

		let _this = this;
		axios.get(url)
			.then((response) => {
				let cars = _this.sortCars(_this.prepareCars(response.data));

				_this.setState({
					cars
				});
			})
			.catch((error) => {
				console.error(error);
			})
	}

	sortCars(cars) {
		const filter = this.state.filters.totalReservationsOrder;
		if(filter === 'ascending') {
			return cars.sort((a, b) => {
				return a.TotalRentals - b.TotalRentals;
			});
		} else if(filter === 'descending') {
			return cars.sort((a, b) => {
				return b.TotalRentals - a.TotalRentals;
			});
		} else {
			return cars;
		}
	}

	handleTableRowClick(e) {
		const vin = e.currentTarget.id;
		this.props.history.push(`/cars/${vin}`);
	}

	render() {
		return (
			<section className='cars'>
				<form>
					<label htmlFor='cars__damaged-or-not-running'>Damaged or Not Running</label>
					<input
						id='cars__damaged-or-not-running'
						type='checkbox'
						checked={this.state.filters.damagedOrNotRunning}
						onClick={this.handleDamagedOrNotRunningClick.bind(this)}
					/>
					<label htmlFor='cars__need-service'>Cars Not Serviced in 5000+ km</label>
					<input
						id='cars__need-service'
						type='checkbox'
						checked={this.state.filters.needService}
						onClick={this.handleNeedServiceClick.bind(this)}
					/>
					<label htmlFor='cars__total-reservations-order' />
					<select
						id='cars__total-reservations-order'
						onChange={this.handleTotalReservationsOrderChange.bind(this)}
						value={this.state.filters.totalReservationsOrder}
					>
						<option value=''></option>
						<option value='ascending'>ascending</option>
						<option value='descending'>descending</option>
					</select>
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
										<th>Total Rentals</th>
									</tr>
								</thead>
								<tbody>
									{this.state.cars.map((car) => {
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
												<td>{car.TotalRentals}</td>
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