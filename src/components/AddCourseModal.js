import React from 'react';
import { useState} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addcourseToJson } from '../slices/CourseSlice';
const AddCourseModal = ({ show, handleClose }) => {
  const dispatch=useDispatch();
  const [coursename,setCoursename]=useState('');
  const [duration,setDuration]=useState('');
  const [startdate,setStartdate]=useState('');
  const [enddate,setEnddate]=useState('');
  const [stack,setStack]=useState('');
  const [description,setDescription]=useState('');
  const [coverphoto,setCoverphoto]=useState(null);
  const [coursenameError,setCoursenameError]=useState('');
  const [durationError,setDurationError]=useState('');
  const [startdateError,setStartdateError]=useState('');
  const [enddateError,setEnddateError]=useState('');
  const [stackError,setStackError]=useState('');
  const [descriptionError,setDescriptionError]=useState('');
  const [coverphotoError,setCoverphotoError]=useState('');
  // validate course name
  const resetval=()=>{
    setCoursename("");
    setDuration("");
    setStartdate("");
    setEnddate("");
    setStack("");
    setDescription("");
    setCoverphoto(null);
    setCoursenameError("");
    setDescriptionError("");
    setDurationError("");
    setStartdateError("");
    setEnddateError("");
    setStackError("");
    setCoverphotoError('');

  }
  const validateCourseName=()=>{
    let nameRegex=/^[a-zA-Z0-9][\s\S]*$/;
    if(!coursename.trim()||!nameRegex.test(coursename.trim())){
        setCoursenameError("valid coursename is required");
    }
    else{
      setCoursenameError("");
    }
  }
  //validate Duration
  const validateDuration=()=>{
    if(duration===""){
      setDurationError("Duration is required");
    }
    else{
      setDurationError("");
    }
  }
  // validate startDate
  const validateStartdate = () => {
  let enteredDate = new Date(startdate);
  
  if (!isNaN(enteredDate.getTime())) {
    let currentDate = new Date();
    
    enteredDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    
    if (enteredDate < currentDate) {
      setStartdateError("Start date should not be in the past");
    } else {
      setStartdateError("");
    }
  } else {
    setStartdateError("Valid date is required");
  }
};
//validate endDate
const validateEnddate = () => {
  let enteredDate = new Date(enddate);
  
  if (!isNaN(enteredDate.getTime())) {
    let currentDate = new Date();
    
    enteredDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    
    if (enteredDate < currentDate) {
      setEnddateError("Start date should not be in the past");
    } else {
      setEnddateError("");
    }
  } else {
    setEnddateError("Valid date is required");
  }
};
// validate stack
const validateStack=()=>{
  if(stack.trim()===""){
    setStackError("technology stack is requried");
  }
  else{
    setStackError("");
  }
}
const validateDescription=()=>{
  if(description.trim()===""){
    setDescriptionError("description is requried");
  }
  else{
    setDescriptionError("");
  }
}
// validate Cover photo
const validateCoverPhoto = () => {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

  if (coverphoto === null || coverphoto.trim() === "") {
    setCoverphotoError("Cover photo URL is required");
  } else if (!urlRegex.test(coverphoto.trim())) {
    setCoverphotoError("Valid cover photo URL is required");
  } else {
    setCoverphotoError("");
  }
};


const addCourse = async () => {
  validateCourseName();
  validateDuration();
  validateStartdate();
  validateEnddate();
  validateStack();
  validateDescription();
  validateCoverPhoto();

  if (
    coursenameError ||
    durationError ||
    startdateError ||
    enddateError ||
    stackError ||
    descriptionError ||
    coverphotoError ||
    !coursename ||
    !duration ||
    !startdate ||
    !enddate ||
    !stack ||
    !coverphoto||
    !description 
    
  ) {
    console.log("error");
    return;
  } else {
    handleClose();
      dispatch(
        addcourseToJson({
          coursename,
          duration,
          startdate,
          enddate,
          stack,
          description,
          coverphoto,
        })
      );
      console.log('success');

  }
  resetval();
  
};

  return (
    <Modal show={show} onHide={handleClose} className="modal-lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Row>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label className='fw-medium'>Course Name<span className="text-danger"> *</span></Form.Label>
          <Form.Control type="text" id="course-name" placeholder="Course Name" value={coursename} onChange={(e)=>{setCoursename(e.target.value)}} onKeyUp={validateCourseName}/>
          <Form.Text className="text-danger" id="c-error">{coursenameError}</Form.Text>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label className='fw-medium'>Duration<span className="text-danger"> *</span></Form.Label>
          <InputGroup>
            <Form.Control type="number" id="course-duration" placeholder="Enter in hrs" min="0" value={duration} onChange={(e)=>{setDuration(e.target.value)}} onKeyUp={validateDuration}/>
          </InputGroup>
          <Form.Text className="text-danger" id="d-error">{durationError}</Form.Text>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label className='fw-medium'>Start Date<span className="text-danger"> *</span></Form.Label>
          <Form.Control type="date" id="course-sdate" value={startdate} onChange={(e)=>{(setStartdate(e.target.value))}} onBlur={validateStartdate}/>
          <Form.Text className="text-danger" id="sd-error">{startdateError}</Form.Text>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label className='fw-medium'>End Date<span className="text-danger"> *</span></Form.Label>
          <Form.Control type="date" id="course-edate" value={enddate} onChange={(e)=>{setEnddate(e.target.value)}} onBlur={validateEnddate} />
          <Form.Text className="text-danger" id="ed-error">{enddateError}</Form.Text>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label className='fw-medium'>Technology Stack<span className="text-danger"> *</span></Form.Label>
          <Form.Control type="text" id="course-stack" placeholder="List separated by comma" value={stack} onChange={(e)=>{setStack(e.target.value)}} onKeyUp={validateStack}/>
          <Form.Text className="text-danger" id="s-error">{stackError}</Form.Text>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label className='fw-medium'>Description<span className="text-danger"> *</span></Form.Label>
          <Form.Control as="textarea" rows={1} id="course-describe" placeholder="Describe within 60 characters" maxLength="60" value={description} onChange={(e)=>{setDescription(e.target.value)}} onKeyUp={validateDescription}/>
          <Form.Text className="text-danger" id="des-error">{descriptionError}</Form.Text>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label className='fw-medium'>Cover Photo<span className="text-danger"> *</span></Form.Label>
          <Form.Control type="text"  pattern="https?://.+" placeholder='cover photo url' value={coverphoto} onChange={(e) => { setCoverphoto(e.target.value); }}  onBlur={validateCoverPhoto} />
          <Form.Text className="text-danger" id="p-error">{coverphotoError}</Form.Text>
        </Form.Group>
      </Col>
    </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={resetval}>
          Reset
        </Button>
        <Button variant="" className="btn-color" onClick={addCourse}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCourseModal;
