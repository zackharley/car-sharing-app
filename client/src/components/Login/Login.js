import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup, Col, FormControl, Button, ControlLabel } from 'react-bootstrap';

export default class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		}
	}

	handleEmailChange(e) {
		this.setState({
			email: e.target.value
		})
	}

	handlePasswordChange(e) {
		this.setState({
			password: e.target.value
		})
	}

	handleSubmit(e) {
		e.preventDefault();

		let _this = this;
		axios.get(`/api/members/login/${this.state.email}/`)
			.then((response) => {
				console.log(response.data[0]);
				// _this.setState({
				// 	rentals: response.data
				// });
			})
			.catch((error) => {
				console.error(error);
			})
	}

	render() {
		return (
			<Form horizontal>
			    <FormGroup controlId='formHorizontalEmail'>
			      	<Col componentClass={ControlLabel} sm={2}>
			        	Email
			      	</Col>
			      	<Col sm={10}>
			        	<FormControl
			        		type='email'
			        		placeholder='Email'
			        		value={this.state.email}
			        		onChange={this.handleEmailChange.bind(this)}
			        	/>
			      	</Col>
		    	</FormGroup>
			    <FormGroup controlId='formHorizontalPassword'>
			      	<Col componentClass={ControlLabel} sm={2}>
			        	Password
			      	</Col>
			      	<Col sm={10}>
			        	<FormControl
			        		type='password'
			        		placeholder='Password'
			        		value={this.state.password}
			        		onChange={this.handlePasswordChange.bind(this)}
			        	/>
			      	</Col>
			    </FormGroup>
			    <FormGroup>
			      	<Col smOffset={2} sm={10}>
			        	<Button type='submit' onClick={this.handleSubmit.bind(this)}>
			          		Sign in
			        	</Button>
			      	</Col>
			    </FormGroup>
			  </Form>
		);
	}
}
