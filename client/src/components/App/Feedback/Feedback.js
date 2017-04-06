import React, { Component } from 'react';
import axios from 'axios';
import {Panel, Table, Col, Button, Form, FormGroup, Radio, ControlLabel, FormControl } from 'react-bootstrap';
import moment from 'moment';

export default class Feedback extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: {
        Comment: '',
        Rating: 0,
        ReservationID: 0,
        MemberID: 0,
        AdminComment: ''
      },
      mode: 'write',
      rating: 3,
      comment: ''
		};
	}

	componentDidMount() {
		let _this = this;
		axios.get(`/api/rentalcomment/${this.props.match.params.rentalID}/`)
			.then((response) => {
        if(response.data.length === 0)
			    this.setState({mode: 'write'});
        else
          this.setState({data: response.data[0], mode: 'read'});
			})
			.catch((error) => {
				console.error(error);
			});
	}

  changeRating(e) {
    this.setState({rating: e.target.id});
  }

  setRating() {
    let post = {
      Comment: this.state.comment,
      Rating: this.state.rating,
      ReservationID: this.props.match.params.rentalID,
      MemberID: this.props.match.params.memberID,
      AdminComment: ''
    }

    this.setState({
      data: post
    });

    let _this = this;
		axios.post('/api/rentalcomment', post)
			.then((response) => {;
				this.setState({mode: 'read'});
			})
			.catch((error) => {
				alert(error);
				console.log(error);
			});
  }

	render() {
		// let locations = this.state.locations;
		let tableData = [];
    let view = null;

    if(this.state.mode === 'write') {
      view =
        <Form horizontal>
          <FormGroup controlId="formControlsTextarea">
            <Col componentClass={ControlLabel} sm={2}>
              Comment
            </Col>
            <Col sm={8}>
              <FormControl onChange={(e)=>this.setState({comment: e.target.value})} componentClass="textarea" placeholder="Comment here." />
            </Col>
          </FormGroup>

          <FormGroup controlId='formHorizontalPassword'>
              <Col componentClass={ControlLabel} sm={2}>
                Rating
              </Col>
              <Col sm={8}>
                <FormGroup>
                   <Radio id={1} onChange={(e)=>this.changeRating(e)} checked={this.state.rating === 1 ? 1 : 0} inline>
                     1
                   </Radio>
                   {' '}
                   <Radio id={2} onChange={(e)=>this.changeRating(e)} checked={this.state.rating === 2 ? 1 : 0} inline>
                     2
                   </Radio>
                   {' '}
                   <Radio id={3} onChange={(e)=>this.changeRating(e)} checked={this.state.rating === 3 ? 1 : 0} inline>
                     3
                   </Radio>
                   {' '}
                   <Radio id={4} onChange={(e)=>this.changeRating(e)} checked={this.state.rating === 4 ? 1 : 0} inline>
                     4
                   </Radio>
                   {' '}
                   <Radio id={5} onChange={(e)=>this.changeRating(e)} checked={this.state.rating === 5 ? 1 : 0} inline>
                     5
                   </Radio>
                </FormGroup>
              </Col>
          </FormGroup>
          <FormGroup>
              <Col smOffset={1} sm={1}>
                <Button bsStyle='primary' onClick={()=>this.setRating()}>
                   Submit
                </Button>
              </Col>
          </FormGroup>
        </Form>;
    } else if(this.state.mode === 'read') {
      view =
        <Form horizontal>
          <FormGroup controlId="formControlsTextarea">
            <Col componentClass={ControlLabel} sm={2}>
              Comment
            </Col>
            <Col sm={8}>
              <FormGroup>
                 <p>{this.state.data.Comment}</p>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup controlId='formControlsTextarea'>
              <Col componentClass={ControlLabel} sm={2}>
                Rating
              </Col>
              <Col sm={8}>
                <FormGroup>
                   <p>{this.state.data.Rating}</p>
                </FormGroup>
              </Col>
          </FormGroup>

          <FormGroup controlId='formControlsTextarea'>
              <Col componentClass={ControlLabel} sm={2}>
                Admin Response
              </Col>
              <Col sm={8}>
                <FormGroup>
                   <p>{(this.state.data.AdminComment) ? this.state.data.AdminComment : 'No response.. yet!'}</p>
                </FormGroup>
              </Col>
          </FormGroup>
        </Form>;
    }

		return (
			<Col mdOffset={2} md={8}>
				<Panel>
					<h1>Feedback for Rental #{this.props.match.params.rentalID}</h1>
					<h4>Give feedback on your rental and an admin will respond.</h4>
          <br />
					{ view }
				</Panel>
			</Col>
		);
	}

}
