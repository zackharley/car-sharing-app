import './Header.scss';
import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import AdminDropdown from './AdminDropdown/AdminDropdown';

import auth from '../../../util/auth.js';

export default class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isAdmin: false,
      		loggedIn: false
		};
	}

	componentWillMount() {
		auth.bindToChange(this);
		auth.sync();
	}

	handleHeaderClick(e) {
		this.props.history.push(e.currentTarget.id);
	}

	handleMyRentalsClick(e) {
		this.props.history.push('/member/reservations');
	}

	logout() {
		auth.logout();
		this.props.history.push('/login');
	}

	render() {
		let logOutButton = null;
		let adminDropdown = null;
		let myRentals = null;

		if(this.state.loggedIn)
			logOutButton = <NavItem onClick={this.logout.bind(this)}>Log Out</NavItem>;

		if(this.state.isAdmin) {
			adminDropdown = <AdminDropdown handleHeaderClick={this.handleHeaderClick.bind(this)} />;
		} else {
			myRentals = <NavItem onClick={this.handleMyRentalsClick.bind(this)}>My Rentals</NavItem>
		}

		return (
			<Navbar staticTop>
			    <Navbar.Header>
			      	<Navbar.Brand id='/' onClick={this.handleHeaderClick.bind(this)}>KTCS</Navbar.Brand>
			    </Navbar.Header>
			    <Nav pullRight>
			    	<NavItem id='/cars' onClick={this.handleHeaderClick.bind(this)}>Cars</NavItem>
			    	<NavItem id='/locations' onClick={this.handleHeaderClick.bind(this)}>Locations</NavItem>
			    	<NavDropdown title='Forms'>
			    		<MenuItem id='/pickup' onClick={this.handleHeaderClick.bind(this)}>Pick Up</MenuItem>
			    		<MenuItem id='/dropoff' onClick={this.handleHeaderClick.bind(this)}>Drop Off</MenuItem>
			    	</NavDropdown>
			    	{ myRentals }
			    	{ adminDropdown }
					{ logOutButton }
			    </Nav>
			</Navbar>
		);
	}
}
