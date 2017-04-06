import React, { Component } from 'react';
import axios from 'axios';
import auth from '../../../../util/auth.js';

export default class Invoice extends Component {

	constructor(props) {
		super(props);
		this.state = {
			invoice: {}
		}
	}

	componentWillMount() {
		if(!auth.isAdmin()) {
			this.props.history.push('/');
		}
	}

	componentDidMount() {
		let _this = this;
		axios.get(`/api/invoice/${_this.props.match.params.memberId}`)
			.then((response) => {
				let invoice = response.data[0];
				invoice.Cost = invoice.Cost.toFixed(2)
				_this.setState({
					invoice
				})
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		return (
			<section>
				<h1>Invoice</h1>
				<p>This user has spent ${this.state.invoice.Cost} this month.</p>
			</section>
		);
	}

}