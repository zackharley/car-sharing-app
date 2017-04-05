import React, { Component } from 'react';

export default class Home extends Component {

	render() {
		console.log(document.cookie);
		return (
			<section>
				{document.cookie}
			</section>
		);
	}

};