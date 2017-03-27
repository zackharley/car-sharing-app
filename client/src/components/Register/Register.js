import './Register.scss';
import React, { Component } from 'react';

export default class Register extends Component {

	handleSubmit(e) {
		e.preventDefault();
		console.log('Submitting the form!');
	}

	render() {
		return (
			<section className='register'>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<input required type='text' id='register__first-name' />
					<input required maxlength='1' type='text' id='register__initial' />
					<input required type='text' id='register__last-name' />
					<input required type='number' id='register__street-number' />
					<input required type='text' id='register__street-name' />
					<input required type='text' id='register__city' />
					<select required id='register__province'>
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
					<input required type='text' id='register__postal-code' pattern='\w\d\w\d\w\d' />
					<input required type='tel' id='register__telephone' />
					<input required type='email' id='register__email' />
					<input required type='password' id='register__license-number' />
					<input required type='password' id='register__license-number-confirm' />
					{/* Choose a plan for monthly fee???? */}
					<input type='submit' value='Register' />
				</form>
			</section>
		);
	}

}
