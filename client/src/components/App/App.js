import './App.scss';
import React, { Component } from 'react';
import Header from './Header';

export default class App extends Component {

	render() {
		return (
			<section className='app'>
				<Header />
			</section>
		);
	}
}