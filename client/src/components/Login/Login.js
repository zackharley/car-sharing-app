import React, { Component } from 'react';
import axios from 'axios';
import { Form, FormGroup, Col, FormControl, Button, ControlLabel, Well } from 'react-bootstrap';

import auth from '../../util/auth.js';

export default class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loginEmail: '',
			loginPassword: '',
			mode: 'login',
			FirstName: '',
			MiddleInit: '',
	    LastName: '',
	    Passwd: '',
	    StreetNum: '',
	    StreetName: '',
	    City: '',
	    Province: '',
	    PostalCode: '',
	    AreaCode: '',
	    PhoneNumber: '',
	    Email: '',
	    LicenseNumber: ''
		}
	}

	handleLoginEmailChange(e) {
		this.setState({
			loginEmail: e.target.value
		})
	}

	handleLoginPasswordChange(e) {
		this.setState({
			loginPassword: e.target.value
		})
	}

	handleSubmitLogin(e) {
		e.preventDefault();

		if(this.state.loginEmail !== '') {
			let _this = this;
			axios.get(`/api/members/login/${this.state.loginEmail}/`)
				.then((response) => {
					console.log(response.data);
					if(response.data !== [] && response.data !== undefined) {
						if(response.data[0].Passwd === this.state.loginPassword) {
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

	// ---------- REGISTER ---------------

	handlePhoneNumberChange(e) {
  	let phoneRegex = /^(\d|\d-|\d-\d{1,3}|\d-\d{3}-|\d-\d{3}-\d{1,3}|\d-\d{3}-\d{3}-|\d-\d{3}-\d{3}-\d{1,4})$/;
  	let PhoneNumber = e.target.value;

  	if(PhoneNumber.match(phoneRegex)) {
			this.setState({
				PhoneNumber
			});
  	}
	}

	handleSubmit(e) {
		e.preventDefault();

		let formData = {
			FirstName: this.state.FirstName,
			MiddleInit: this.state.MiddleInit,
	    LastName: this.state.LastName,
	    Passwd: this.state.Passwd,
	    StreetNum: this.state.StreetNum,
	    StreetName: this.state.StreetName,
	    City: this.state.City,
	    Province: this.state.Province,
	    PostalCode: this.state.PostalCode,
	    CountryCode: this.state.CountryCode,
	    AreaCode: this.state.AreaCode,
	    PhoneNumber: this.state.PhoneNumber,
	    Email: this.state.Email,
	    LicenseNumber: this.state.LicenseNumber
		};

		let PhoneNumber = formData.PhoneNumber.split('-');

		formData.CountryCode = PhoneNumber[0];
		formData.AreaCode = PhoneNumber[1];
		formData.PhoneNumber = PhoneNumber[2] + PhoneNumber[3];

		let _this = this;
		axios.post('/api/members', formData)
			.then((response) => {
				auth.login(response.data.insertId, false);
				_this.props.history.push('/');
			})
			.catch((error) => {
				// Somehow figure out what the error was
				alert(error);
				console.log(error);
			});
	}

	render() {
		let viewData = null;

		if(this.state.mode === 'login') {
			viewData =
				<Form horizontal>
			    <FormGroup controlId='formHorizontalEmail'>
			      	<Col componentClass={ControlLabel} sm={2}>
			        	Email
			      	</Col>
			      	<Col sm={8}>
			        	<FormControl
			        		type='email'
			        		placeholder='Email'
			        		value={this.state.loginEmail}
			        		onChange={this.handleLoginEmailChange.bind(this)}
			        	/>
			      	</Col>
		    	</FormGroup>
			    <FormGroup controlId='formHorizontalPassword'>
			      	<Col componentClass={ControlLabel} sm={2}>
			        	Password
			      	</Col>
			      	<Col sm={8}>
			        	<FormControl
			        		type='password'
			        		placeholder='Password'
			        		value={this.state.loginPassword}
			        		onChange={this.handleLoginPasswordChange.bind(this)}
			        	/>
			      	</Col>
			    </FormGroup>
			    <FormGroup>
			      	<Col smOffset={2} sm={1}>
			        	<Button type='submit' bsStyle='primary' onClick={this.handleSubmitLogin.bind(this)}>
			          		Sign in
			        	</Button>
			      	</Col>

							<Col sm={2}>
			        	<Button bsStyle='success' onClick={() => this.setState({mode: 'register'})}>
			          		New User
			        	</Button>
			      	</Col>
			    </FormGroup>
			  </Form>;
		} else if (this.state.mode === 'register') {
			viewData =
					<Form horizontal>
						<FormGroup controlId="formHorizontalEmail">
		 					 <Col componentClass={ControlLabel} sm={2}>
		 						 First Name
		 					 </Col>
		 					 <Col sm={8}>
		 						 <FormControl type="text" placeholder="First Name" onChange={(e)=>this.setState({FirstName: e.target.value})}/>
		 					 </Col>
		 				 </FormGroup>

						 <FormGroup controlId="formHorizontalEmail">
							 <Col componentClass={ControlLabel} sm={2}>
								 Initial
							 </Col>
							 <Col sm={8}>
								 <FormControl type="text" placeholder="Initial" onChange={(e)=>this.setState({MiddleInit: e.target.value})}/>
							 </Col>
						 </FormGroup>

						 <FormGroup controlId="formHorizontalEmail">
							<Col componentClass={ControlLabel} sm={2}>
								Last Name
							</Col>
							<Col sm={8}>
								<FormControl type="text" placeholder="Last Name" onChange={(e)=>this.setState({LastName: e.target.value})}/>
							</Col>
						</FormGroup>

						 <FormGroup controlId="formHorizontalEmail">
							 <Col componentClass={ControlLabel} sm={2}>
								 Email
							 </Col>
							 <Col sm={8}>
								 <FormControl type="email" placeholder="Email" onChange={(e)=>this.setState({Email: e.target.value})}/>
							 </Col>
						 </FormGroup>

						 <FormGroup controlId="formHorizontalPassword">
							 <Col componentClass={ControlLabel} sm={2}>
								 Password
							 </Col>
							 <Col sm={8}>
								 <FormControl type="password" placeholder="Password" onChange={(e)=>this.setState({Passwd: e.target.value})}/>
							 </Col>
						 </FormGroup>

						 <FormGroup controlId="formHorizontalEmail">
							<Col componentClass={ControlLabel} sm={2}>
								Street Number
							</Col>
							<Col sm={8}>
								<FormControl type="text" placeholder="Street Number" onChange={(e)=>this.setState({StreetNum: e.target.value})}/>
							</Col>
						</FormGroup>

						<FormGroup controlId="formHorizontalEmail">
						 <Col componentClass={ControlLabel} sm={2}>
							 Street Name
						 </Col>
						 <Col sm={8}>
							 <FormControl type="text" placeholder="Street Name" onChange={(e)=>this.setState({StreetName: e.target.value})}/>
						 </Col>
					 </FormGroup>

					 <FormGroup controlId="formHorizontalEmail">
						<Col componentClass={ControlLabel} sm={2}>
							City
						</Col>
						<Col sm={8}>
							<FormControl type="text" placeholder="City" onChange={(e)=>this.setState({City: e.target.value})}/>
						</Col>
					</FormGroup>

					<FormGroup controlId="formHorizontalEmail">
						<Col componentClass={ControlLabel} sm={2}>
							Province
						</Col>
						<Col sm={8}>
							<FormControl
								componentClass="select"
								placeholder="select"
								onChange={(e)=>this.setState({Province: e.target.value})}
							>
								<option value="select">Select a Province</option>
								<option value='Alberta'>Alberta</option>
								<option value='British Columbia'>British Columbia</option>
								<option value='Manitoba'>Manitoba</option>
								<option value='New Brunswick'>New Brunswick</option>
								<option value='Newfoundland and Labrador'>Newfoundland and Labrador</option>
								<option value='Northwest Territories'>Northwest Territories</option>
								<option value='Nova Scotia'>Nova Scotia</option>
								<option value='Nunavut'>Nunavut</option>
								<option value='Ontario'>Ontario</option>
								<option value='Prince Edward Island'>Prince Edward Island</option>
								<option value='Quebec'>Quebec</option>
								<option value='Saskatchewan'>Saskatchewan</option>
								<option value='Yukon'>Yukon</option>
							</FormControl>
						</Col>
					</FormGroup>

					<FormGroup controlId="formHorizontalEmail">
					 <Col componentClass={ControlLabel} sm={2}>
						 Phone Number
					 </Col>
					 <Col sm={8}>
						 <FormControl type="text" placeholder="x-xxx-xxx-xxxx" onChange={(e)=>this.handlePhoneNumberChange(e)}/>
					 </Col>
				 </FormGroup>

				 <FormGroup controlId="formHorizontalEmail">
					<Col componentClass={ControlLabel} sm={2}>
						Postal Code
					</Col>
					<Col sm={8}>
						<FormControl type="text" placeholder="Postal Code" onChange={(e)=>this.setState({PostalCode: e.target.value})}/>
					</Col>
				</FormGroup>

				<FormGroup controlId="formHorizontalEmail">
				 <Col componentClass={ControlLabel} sm={2}>
					 License Number
				 </Col>
				 <Col sm={8}>
					 <FormControl type="text" placeholder="License Number" onChange={(e)=>this.setState({LicenseNumber: e.target.value})}/>
				 </Col>
			 </FormGroup>

			 <FormGroup>
				 <Col smOffset={2} sm={1}>
					 <Button bsStyle='success' type="submit" onClick={this.handleSubmit.bind(this)}>
						 Register
					 </Button>
				 </Col>

				 <Col sm={2}>
					 <Button bsStyle='primary' type="submit" onClick={() => this.setState({mode: 'login'})}>
						 Already Registered?
					 </Button>
				 </Col>
			 </FormGroup>
		 </Form>;
		}

		return (
			<div>
				{ viewData }
			</div>
		);
	}
}
