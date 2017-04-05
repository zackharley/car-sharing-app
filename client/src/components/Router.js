import './Router.scss';
import React, { PropTypes, Component } from 'react';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Success from './Register/Success/Success';
import Header from './App/Header';
import Cars from './App/Cars/Cars';
import Car from './App/Cars/Car/Car';
import Locations from './App/Locations/Locations';
import PickUp from './App/PickUp/PickUp';
import DropOff from './App/DropOff/DropOff';

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
						<Route path='/cars/:vin' component={Car} />
						<Route path='/locations' component={Locations} />
						<Route path='/pickup' component={PickUp} />
						<Route path='/dropoff' component={DropOff} />
					</Switch>
				</section>
			</BrowserRouter>
		);
	}

}
