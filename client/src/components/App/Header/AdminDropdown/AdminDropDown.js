import React, { Component } from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';

export default class AdminDropdown extends Component {

	render() {
		return (
			<NavDropdown title='Admin'>
				<MenuItem id='/invoice' onClick={this.props.handleHeaderClick.bind(this)}>Invoice</MenuItem>
				<MenuItem id='/cars/add' onClick={this.props.handleHeaderClick.bind(this)}>Add a Car</MenuItem>
			</NavDropdown>
		);
	}
}