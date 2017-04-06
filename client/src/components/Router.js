import './Router.scss';
import React, { PropTypes, Component } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Success from './Register/Success/Success';
import Header from './App/Header/Header';

/* Registered User Components */
import Cars from './App/Cars/Cars';
import Car from './App/Cars/Car/Car';
import Locations from './App/Locations/Locations';
import PickUp from './App/PickUp/PickUp';
import DropOff from './App/DropOff/DropOff';
import Rentals from './App/Rentals/Rentals';

/* Admin Components */
import Invoice from './App/Invoice/Invoice';
import AddCar from './App/Cars/AddCar/AddCar';
import CarHistory from './App/Cars/Car/CarHistory/CarHistory';
import Location from './App/Locations/Location/Location';

export default class Router extends Component {

	render() {
		return (
			<BrowserRouter>
				<section className='root'>
					<Route path='/' component={Header} />
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/register' component={Register} />
						<Route exact path='/register/success' component={Success} />
						<Route exact path='/login' component={Login} />
						<Route exact path='/cars' component={Cars} />
						<Route exact path='/cars/add' component={AddCar} />
						<Route exact path='/cars/:vin' component={Car} />
						<Route exact path='/cars/:vin/history' component={CarHistory} />
						<Route exact path='/locations' component={Locations} />
						<Route path='/locations/:id' component={Location} />
						<Route path='/pickup' component={PickUp} />
						<Route path='/dropoff' component={DropOff} />
						<Route path='/invoice' component={Invoice} />
						<Route exact path='/member/rentals' component={Rentals} />{/*/member is for the current user*/}
					</Switch>
				</section>
			</BrowserRouter>
		);
	}

}
