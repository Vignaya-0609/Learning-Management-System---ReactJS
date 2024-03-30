import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'; 
import "../assets/sass/style.scss";
function Forget() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const validateEmail = () => {
    const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9]+@[a-z]+[.]+[a-z]{2,3}$/;
    const emailRegex2 = /^[a-zA-Z0-9]+[a-zA-Z0-9]+@[a-z]+[.]+[a-z]+[.]+[a-z]{2,3}$/;

    if (email.match(emailRegex) || email.match(emailRegex2)) {
      setEmailError('');
      setShowModal(true);
    } else {
      setEmailError('Valid Email is required');
    }
  };
  const handleForget=(e)=>{
    e.preventDefault();
    validateEmail();
    setEmail('');
  }
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="container bg-body-white shadow p-3 w-75">
        <h4>Forget Password</h4>
        <p>Enter your email address, and we'll send you instructions on how to reset your password.</p>
        <div className="mb-2">
          <Form onSubmit={handleForget}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  
                }}
              />
              <Form.Text className="text-danger">{emailError}</Form.Text>
            </Form.Group>
            <Button variant="" className="btn-color" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
    <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Password reset instructions have been sent to your email address.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  </>
  )
}

export default Forget