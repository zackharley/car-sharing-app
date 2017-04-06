import './Router.scss';
import React, { PropTypes, Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { browserHistory } from 'react-router'
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Success from './Register/Success/Success';
import Header from './App/Header/Header';

/* Registered User Components */
import CarsWrapper from './App/Cars/CarsWrapper';
import Car from './App/Cars/Car/Car';
import Locations from './App/Locations/Locations';
import PickUp from './App/PickUp/PickUp';
import DropOff from './App/DropOff/DropOff';
import Rentals from './App/Rentals/Rentals';

/* Admin Components */
import Invoices from './App/Invoices/Invoices';
import Invoice from './App/Invoices/Invoice/Invoice';
import AddCar from './App/Cars/AddCar/AddCar';
import CarHistory from './App/Cars/Car/CarHistory/CarHistory';
import Location from './App/Locations/Location/Location';

import DailyReservations from './App/DailyReservations/DailyReservations';
import Feedback from './App/Feedback/Feedback'

import auth from '../util/auth.js';

export default class Router extends React.Component {

	render() {
		var redirect = <Redirect to="/login"/>

		auth.sync(function() {
			var loggedIn = auth.isLoggedIn();

			if(loggedIn)
				redirect = <div></div>;
		});

		return (
			<BrowserRouter>
				<section className='root'>
					<Route path='/' component={Header} />
					{ redirect }
					<Switch>
						<Route exact path='/' component={Home} />
						{/* <Route exact path='/register' component={Register} /> */}
						{/* <Route exact path='/register/success' component={Success} /> */}
						<Route exact path='/login' component={Login} />
						<Route exact path='/cars' component={CarsWrapper} />
						<Route exact path='/cars/add' component={AddCar} />
						<Route exact path='/cars/:vin' component={Car} />
						<Route exact path='/cars/:vin/history' component={CarHistory} />
						<Route exact path='/locations' component={Locations} />
						<Route path='/locations/:id' component={Location} />
						<Route path='/pickup' component={PickUp} />
						<Route path='/dropoff' component={DropOff} />
						<Route exact path='/invoice' component={Invoices} />
						<Route path='/invoice/:memberId' component={Invoice} />
						<Route exact path='/member/reservations' component={Rentals} />{/*/member is for the current user*/}
						<Route exact path='/reservations/:date' component={DailyReservations} />
						<Route exact path='/member/:memberID/rentals/:rentalID' component={Feedback} />{/*/member is for the current user*/}
					</Switch>
				</section>
			</BrowserRouter>
		);
	}
}
