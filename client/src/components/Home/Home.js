import React, { Component } from 'react';
import { Jumbotron, Button, Col } from 'react-bootstrap';

export default class Home extends Component {

	render() {
		return (
			<Col smOffset={1} sm={10}>
				<Jumbotron>
					<Col mdOffset={1}>
						<h1>Welcome to KTCS!</h1>
						<p>K-Town Car Share is a car sharing platform for the Kingston regional area.</p>
						<p><Button bsStyle="primary" onClick={()=>{this.props.history.push('/cars')}}>Find a Car</Button></p>
					</Col>
				</Jumbotron>
			</Col>
		);
	}

};
