/* eslint-disable react/state-in-constructor */
/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import {
  MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter
} from 'mdbreact';
import Form from 'src/multiSteps';

class ModalPage extends Component {
state = {
  modal14: false
}

toggle = (nr) => () => {
  const modalNumber = `modal${nr}`;
  this.setState({
    [modalNumber]: !this.state[modalNumber]
  });
}

render() {
  return (
    <MDBContainer>
      <MDBBtn color="primary" onClick={this.toggle(14)}>add jobSite</MDBBtn>
      <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
        <MDBModalHeader toggle={this.toggle(14)}>New job site</MDBModalHeader>
        <MDBModalBody>
          <Form />
        </MDBModalBody>
        <MDBModalFooter />
      </MDBModal>
    </MDBContainer>
  );
}
}

export default ModalPage;
