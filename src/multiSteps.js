/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React from 'react';
import {
  MDBContainer, MDBRow, MDBCol, MDBStepper, MDBBtn, MDBInput
} from 'mdbreact';
import Map from 'src/components/Map';

class StepperExample extends React.Component {
  constructor(props) {
    super();
    this.state = {
      formActivePanel1: 1,
      formActivePanel1Changed: false,
    };
  }

swapFormActive = (a) => (param) => (e) => {
  this.setState({
    [`formActivePanel${a}`]: param,
    [`formActivePanel${a}Changed`]: true
  });
}

handleNextPrevClick = (a) => (param) => (e) => {
  this.setState({
    [`formActivePanel${a}`]: param,
    [`formActivePanel${a}Changed`]: true
  });
}

handleSubmission = () => {
  alert('Form submitted!');
}

calculateAutofocus = (a) => {
  if (this.state[`formActivePanel${a}Changed`]) {
    return true;
  }
}

render() {
  return (
    <MDBContainer>

      <form role="form" action="" method="post">
        <MDBRow>
          {this.state.formActivePanel1 == 1
          && (
          <MDBCol md="12">
            <MDBInput label="Username" className="mt-4" />
            <Map
              google={this.props.google}
              center={{ lat: 18.5204, lng: 73.8567 }}
              height={400}
              zoom={15}
            />
            <MDBBtn color="mdb-color" rounded className="float-right" onClick={this.handleNextPrevClick(1)(2)}>next</MDBBtn>
          </MDBCol>
          )}

          {this.state.formActivePanel1 == 2
          && (
          <MDBCol md="12">

            <MDBInput label="Automatic timer actions" className="mt-3" />
            <MDBInput label="TRACK TIME TO PROJECT" className="mt-3" />
            <MDBInput label="ON DEPARTURE" type="textarea" rows="2" />
            <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(1)}>previous</MDBBtn>
            <MDBBtn color="mdb-color" rounded className="float-right" onClick={this.handleNextPrevClick(1)(3)}>next</MDBBtn>
          </MDBCol>
          )}
          {this.state.formActivePanel1 == 3
          && (
          <MDBCol md="12">
            <h3 className="font-weight-bold pl-0 my-4"><strong>Finish</strong></h3>
            <h2 className="text-center font-weight-bold my-4">Save New job site</h2>
            <MDBBtn color="mdb-color" rounded className="float-left" onClick={this.handleNextPrevClick(1)(2)}>previous</MDBBtn>
            <MDBBtn color="success" rounded className="float-right" onClick={this.handleSubmission}>submit</MDBBtn>
          </MDBCol>
          )}
        </MDBRow>
      </form>
    </MDBContainer>
  );
}
}

export default StepperExample;
