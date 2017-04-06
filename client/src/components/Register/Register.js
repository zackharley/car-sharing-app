import './Register.scss';
import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {

	constructor(props) {
		super(props);
		this.state = {
			FirstName: '',
			MiddleInit: '',
		    LastName: '',
		    Passwd: '',
		    PasswdConfirm: '',
		    StreetNum: '',
		    StreetName: '',
		    City: '',
		    Province: '',
		    PostalCode: '',
		    CountryCode: '',
		    AreaCode: '',
		    PhoneNumber: '',
		    Email: '',
		    LicenseNumber: '',
		    LicenseNumberConfirm: ''
		};
	} 

	handleFirstNameChange(e) {
		this.setState({
			FirstName: e.target.value
		});
	}

	handleMiddleInitChange(e) {
		this.setState({
			MiddleInit: e.target.value
		});
	}

    handleLastNameChange(e) {
		this.setState({
			LastName: e.target.value
		});
	}

	handlePasswdChange(e) {
		this.setState({
			Passwd: e.target.value
		});
	}

	handlePasswdConfirmChange(e) {
		this.setState({
			PasswdConfirm: e.target.value
		});
	}

    handleStreetNumChange(e) {
		this.setState({
			StreetNum: e.target.value
		});
	}

    handleStreetNameChange(e) {
		this.setState({
			StreetName: e.target.value
		});
	}

    handleCityChange(e) {
		this.setState({
			City: e.target.value
		});
	}

    handleProvinceChange(e) {
		this.setState({
			Province: e.target.value
		});
	}

    handlePostalCodeChange(e) {
		this.setState({
			PostalCode: e.target.value
		});
	}

    handleCountryCodeChange(e) {
		this.setState({
			CountryCode: e.target.value
		});
	}

    handleAreaCodeChange(e) {
		this.setState({
			AreaCode: e.target.value
		});
	}

    handlePhoneNumberChange(e) {
    	let phoneRegex = /^(\d|\d-|\d-\d{1,3}|\d-\d{3}-|\d-\d{3}-\d{1,3}|\d-\d{3}-\d{3}-|\d-\d{3}-\d{3}-\d{1,4})$/;
    	let PhoneNumber = e.target.value;

    	if(PhoneNumber.match(phoneRegex)) {
			this.setState({
				PhoneNumber
			});
    	}
	}

    handleEmailChange(e) {
		this.setState({
			Email: e.target.value
		});
	}

    handleLicenseNumberChange(e) {
		this.setState({
			LicenseNumber: e.target.value
		});
	}

	handleLicenseNumberConfirmChange(e) {
		this.setState({
			LicenseNumberConfirm: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();

		let formData = this.state;

		if(formData.Passwd !== formData.PasswdConfirm) {
			return alert('Your password entries did not match');
		}

		if(formData.LicenseNumber !== formData.LicenseNumberConfirm) {
			return alert('Your license entries did not match');
		}

		delete formData.PasswdConfirm;
		delete formData.LicenseNumberConfirm;

		let PhoneNumber = formData.PhoneNumber.split('-');

		formData.CountryCode = PhoneNumber[0];
		formData.AreaCode = PhoneNumber[1];
		formData.PhoneNumber = PhoneNumber[2] + PhoneNumber[3];

		let _this = this;
		axios.post('/api/members', formData)
			.then((response) => {
				console.log(response);
				_this.props.history.push('/register/success');
			})
			.catch((error) => {
				// Somehow figure out what the error was
				alert(error);
				console.log(error);
			});
	}

	render() {
		return (
			<section className='register'>
				<section className='register__photo'>
					<section className='register__photo--overlay' />
				</section>
				<form className='register__form' onSubmit={this.handleSubmit.bind(this)}>
					<label htmlFor='register__first-name'>First Name</label>
					<input required type='text' id='register__first-name' value={this.state.FirstName} onChange={this.handleFirstNameChange.bind(this)}/>
					<label htmlFor='register__initial'>Middle Name Initial</label>
					<input required maxLength='1' type='text' id='register__initial' value={this.state.MiddleInit} onChange={this.handleMiddleInitChange.bind(this)}/>
					<label htmlFor='register__last-name'>Last Name</label>
					<input required type='text' id='register__last-name' value={this.state.LastName} onChange={this.handleLastNameChange.bind(this)}/>
					<label htmlFor='register__password'>Password</label>
					<input required type='password' id='register__password' value={this.state.Passwd} onChange={this.handlePasswdChange.bind(this)}/>
					<label htmlFor='register__password-confirm'>Confirm Password</label>
					<input required type='password' id='register__password-confirm' value={this.state.PasswdConfirm} onChange={this.handlePasswdConfirmChange.bind(this)}/>
					<label htmlFor='register__street-number'>Street Number</label>
					<input required type='number' id='register__street-number' min='0' value={this.state.StreetNum} onChange={this.handleStreetNumChange.bind(this)}/>
					<label htmlFor='register__street-name'>Street Name</label>
					<input required type='text' id='register__street-name' value={this.state.StreetName} onChange={this.handleStreetNameChange.bind(this)}/>
					<label htmlFor='register__city'>City</label>
					<input required type='text' id='register__city' value={this.state.City} onChange={this.handleCityChange.bind(this)}/>
					<label htmlFor='register__province'>Province</label>
					<select required id='register__province' value={this.state.Province} onChange={this.handleProvinceChange.bind(this)}>
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
					</select>
					<label htmlFor='register__postal-code' maxLength='6'>Postal Code</label>
					<input required type='text' id='register__postal-code' pattern='\w\d\w\d\w\d' value={this.state.PostalCode} onChange={this.handlePostalCodeChange.bind(this)}/>
					<label htmlFor='register__telephone'>Telephone Number (format: X-XXX-XXX-XXXX)</label>
					<input required type='tel' id='register__telephone' value={this.state.PhoneNumber} onChange={this.handlePhoneNumberChange.bind(this)}/>
					<label htmlFor='register__email'>Email Address</label>
					<input required type='email' id='register__email' value={this.state.Email} onChange={this.handleEmailChange.bind(this)}/>
					<label htmlFor='register__license-number'>License Number</label>
					<input required type='password' id='register__license-number' value={this.state.LicenseNumber} onChange={this.handleLicenseNumberChange.bind(this)}/>
					<label htmlFor='register__license-number-confirm'>Confirm License Number</label>
					<input required type='password' id='register__license-number-confirm' value={this.state.LicenseNumberConfirm} onChange={this.handleLicenseNumberConfirmChange.bind(this)} />
					{/* Choose a plan for monthly fee???? */}
					<input type='submit' value='Register' />
				</form>
			</section>
		);
	}

}