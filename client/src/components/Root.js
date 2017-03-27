import './Root.scss';
import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home/Home';
import Register from './Register/Register';

const Root = ({ store }) => (
	<Provider store={store}>
		<BrowserRouter>
			<section>
				<Route exact path='/' component={Home} />
				<Route path='/register' component={Register} />
			</section>
		</BrowserRouter>
	</Provider>
);

Root.propTypes = {
	store: PropTypes.object.isRequired
};

export default Root;