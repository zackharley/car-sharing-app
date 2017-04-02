import './Root.scss';
import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home/Home';
import Register from './Register/Register';
import Success from './Register/Success/Success';
import Header from './App/Header';
import Cars from './App/Cars/Cars';

const Root = ({ store }) => (
	<Provider store={store}>
		<BrowserRouter>
			<section className='root'>
				<Route exact path='/' component={Home} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/register/success' component={Success} />
				<Route path='/app' component={Header} />
				<Switch>
					<Route path='/app/cars' component={Cars} />
				</Switch>
			</section>
		</BrowserRouter>
	</Provider>
);

Root.propTypes = {
	store: PropTypes.object.isRequired
};

export default Root;