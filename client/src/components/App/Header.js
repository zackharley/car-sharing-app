import './Header.scss';
import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

export default class Header extends Component {

	handleHeaderClick(e) {
		this.props.history.push(e.currentTarget.id);
	}

	render() {
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
			    </Nav>
			</Navbar>
		);
	}
}