import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup, Col, FormControl, Button, ControlLabel } from 'react-bootstrap';

import auth from '../../util/auth.js';

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

		if(this.state.email !== '') {
			let _this = this;
			axios.get(`/api/members/login/${this.state.email}/`)
				.then((response) => {
					if(response.data !== [] && response.data !== undefined) {
						if(response.data[0].Passwd === this.state.password) {
							auth.login(response.data[0].MemberID, response.data[0].isAdmin);

							this.props.history.push('/');
						}
					}
				})
				.catch((error) => {
					console.error(error);
				})
		}
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
