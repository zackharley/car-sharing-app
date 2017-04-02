import './Cars.scss';
import React, { Component } from 'react';
import axios from 'axios';
import { Table, Column, Cell } from 'fixed-data-table';

export default class Cars extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cars: []
		};
	}

	componentDidMount() {
		let _this = this;
		axios.get('/api/cars')
			.then((response) => {
				console.log(response);
				_this.setState({
					cars: response.data
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		const arr = [1,2,3,4,5];
		return (
			<section className='cars'>
				<Table
					rowsCount={arr.length}
					rowHeight={50}
					width={400}
					height={400}
				>
					<Column
						header={<Cell>Header</Cell>}
						cell={props => (
				            <Cell {...props}>
				              	{arr[props.rowIndex].name}
				            </Cell>
			        	)}
						width={200}
					/>
				</Table>
			</section>
		);
	}

}