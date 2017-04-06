import React, { Component } from 'react';
import Cars from './Cars';
import AdminCars from './AdminCars';
import auth from '../../../util/auth';

export default class CarWrapper extends Component {

	render() {
		if(auth.isAdmin()) {
			return <AdminCars history={this.props.history} />
		} 
		return <Cars history={this.props.history} />
	}
}