import './Header.scss';
import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

export default class Header extends Component {

	render() {
		return (
			<Navbar staticTop>
			    <Navbar.Header>
			      	<Navbar.Brand>KTCS</Navbar.Brand>
			    </Navbar.Header>
			</Navbar>
		);
	}
}