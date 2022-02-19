import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Modal,Button,Row,Col,Form} from "react-bootstrap";

class DeleteModal extends Component {


    constructor(props) {
        super(props);
   this.state ={
    Show : props.show
   }
      }
    
  render() {

   let props= {...this.props}

    return (
      <>
     
        <Modal
          show={this.props.Show} 
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          style={{backgroundColor: 'transparent'}}
        >
          <Modal.Header >
            <Modal.Title id="contained-modal-title-vcenter">
              Delete
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Are You Sure ?</h4>
            <p>
         
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn btn-danger" onClick={this.props.Hide} >Close</Button>
            <Button className="btn btn-success"  onClick={this.props.Confirm}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default DeleteModal;
