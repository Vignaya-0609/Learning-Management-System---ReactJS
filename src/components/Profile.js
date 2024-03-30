import React, { useEffect } from 'react'
import { useState } from 'react';
import avatar from "../assets/images/avatar.png";
import Button from 'react-bootstrap/Button';
import { Form, Col} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import "../assets/sass/style.scss";
import { useDispatch, useSelector } from 'react-redux';
import { getUsersFromJson, updateUserProfileList } from '../slices/UserSlice';
function Profile() {
  const currentUserId=localStorage.getItem('currentUser');  
  const currentUser=JSON.parse(currentUserId)
  const userList=useSelector((state)=>state.user.userList);
  const user=userList.find(user =>user.id ===currentUser.id);
  const dispatch=useDispatch();
  const [show, setShow] = useState(false);
  const [education, setEducation] = useState(user ? (user.education || '') : '');
  const [phone, setPhoneno] = useState(user ? (user.phoneno || '') : '');
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(()=>{
    dispatch(getUsersFromJson());
  },[dispatch])
  
  const saveChanges = async () => {
    handleClose();
    dispatch(updateUserProfileList({ education:education, phoneno: phone, id: user.id }));
  };
  
  const validatePhoneNumber = (input) => {
    input.value = input.value.replace(/\D/g, ''); 
  };
  return (
    // profile card
    <>
        <div className="row bg-white text-dark rounded-2 shadow mb-3 mt-3">
            <div className="col-md-2 d-flex justify-content-center align-items-center mt-2 mb-2">
                <img src={avatar} class="rounded-circle" id="image" width="120px" height="120px" alt="profile"></img>
            </div>
            <div className="col-md-10" id={currentUser.id}>
                <div className="row mb-3">
                    <div className="p-3 col-md-4">
                        <h6>Name</h6>
                        <p>{user && user.username}</p>
                    </div>
                    <div className="p-3 col-md-4">
                        <h6>Email</h6>
                        <p>{user && user.email}</p>
                    </div>
                    <div className="p-3 col-md-4">
                        <h6>User Type</h6>
                        <p>{user && user.usertype}</p>
                        <Button variant="" className='btn-color' onClick={handleShow}>
                        Profile
                        </Button>
                    </div>
                </div>
            </div>
        </div>
        {/* profile modal */}
        <Modal  show={show} onHide={handleClose} className='modal-lg'>
        <Modal.Header closeButton>
          <Modal.Title>My Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="row mb-3 p-2">
        <Col md={6} className='mb-3'>
          <h6>Name</h6>
          <Form.Control type="text" placeholder="Default input" value={user && user.username} disabled />
        </Col>
        <Col md={6} className='mb-3'>
          <h6>Email</h6>
          <Form.Control type="text" placeholder="Default input" value={user && user.email} disabled />
        </Col>
        <Col md={6} className='mb-3'>
          <h6>User Type</h6>
          <Form.Control type="text" placeholder="Default input" value={user && user.usertype} disabled />
        </Col>
        <Col md={6} className='mb-3'>
          <h6>Education</h6>
          <Form.Control type="text" placeholder="Highest Education" value={education} onChange={(e)=>{setEducation(e.target.value)}} />
        </Col>
        <Col md={6} className='mb-3'>
          <h6>Phone Number</h6>
          <Form.Control type="tel" id="mobileNumber" name="mobileNumber" maxLength="10" placeholder="Mobile Number" min="0" value={phone} onChange={(e)=>{setPhoneno(e.target.value)}} onInput={(e) => validatePhoneNumber(e.target)} />
        </Col>
      </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="" className='btn-color' onClick={saveChanges}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>  
  )
}

export default Profile;