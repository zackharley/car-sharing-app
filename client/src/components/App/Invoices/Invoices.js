import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';

export default class Invoices extends Component {

	constructor(props) {
		super(props);
		this.state = {
			memberId: ''
		}
	}

	handleMemberIdChange(e) {
		this.setState({
			memberId: e.target.value
		});
	}

	handleGenerateInvoiceClick(e) {
		this.props.history.push(`/invoice/${this.state.memberId}`);
	}

	render() {
		return (
			<section>
				<Panel header={<h3>Insert a Member ID to get their invoice</h3>} bsStyle='primary'>
					<input
						type='text'
						value={this.state.memberId}
						onChange={this.handleMemberIdChange.bind(this)}
					/>
					<Button onClick={this.handleGenerateInvoiceClick.bind(this)}>Generate Invoice</Button>
				</Panel>
			</section>
		);
	}

}