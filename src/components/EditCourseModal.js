import React,{useEffect, useState} from 'react'
import { Modal, Button } from 'react-bootstrap';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updatecourseToJson } from '../slices/CourseSlice';
function EditCourseModal({ show, handleClose }) {
  const [id,setId]=useState('');
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

  const {selectedCourse}=useSelector((state)=>state.course);
  // console.log(selectedCourse)
  const dispatch=useDispatch();

  useEffect(() => {
    if (selectedCourse && Object.keys(selectedCourse).length !== 0) {
      setCoursename(selectedCourse.coursename);
      setDuration(selectedCourse.duration);
      setStartdate(selectedCourse.startdate);
      setEnddate(selectedCourse.enddate);
      setStack(selectedCourse.stack);
      setDescription(selectedCourse.description);
      setCoverphoto(selectedCourse.coverphoto);
      setId(selectedCourse.id);
    }
  }, [selectedCourse]);
  
  // console.log(id)
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
    if (!startdate) {
      setStartdateError("Start date is required");
    } else {
      setStartdateError("");
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

const updateCourseData=()=>{
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
        updatecourseToJson({
          id,
          coursename,
          duration,
          startdate,
          enddate,
          stack,
          description,
          coverphoto,
        })
      );
      // console.log('success');

  }
}

  return (
    <>
    <Modal show={show} onHide={handleClose} className="modal-lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Row>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label className='fw-medium'>Course Name<span className="text-danger"> *</span></Form.Label>
          <Form.Control type="text" placeholder="Course Name" value={coursename} onChange={(e)=>{setCoursename(e.target.value)}} onBlur={validateCourseName}/>
          <Form.Text className="text-danger">{coursenameError}</Form.Text>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label className='fw-medium'>Duration<span className="text-danger"> *</span></Form.Label>
          <InputGroup>
            <Form.Control type="number" placeholder="Enter in hrs" min="0" value={duration} onChange={(e)=>{setDuration(e.target.value)}} onBlur={validateDuration}/>
          </InputGroup>
          <Form.Text className="text-danger">{durationError}</Form.Text>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label className='fw-medium'>Start Date<span className="text-danger"> *</span></Form.Label>
          <Form.Control type="date" value={startdate} onChange={(e)=>{(setStartdate(e.target.value))}} onBlur={validateStartdate}/>
          <Form.Text className="text-danger">{startdateError}</Form.Text>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label className='fw-medium'>End Date<span className="text-danger"> *</span></Form.Label>
          <Form.Control type="date" value={enddate} onChange={(e)=>{setEnddate(e.target.value)}} onBlur={validateEnddate}/>
          <Form.Text className="text-danger">{enddateError}</Form.Text>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label className='fw-medium'>Technology Stack<span className="text-danger"> *</span></Form.Label>
          <Form.Control type="text" placeholder="List separated by comma" value={stack} onChange={(e)=>{setStack(e.target.value)}} onBlur={validateStack}/>
          <Form.Text className="text-danger">{stackError}</Form.Text>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label className='fw-medium'>Description<span className="text-danger"> *</span></Form.Label>
          <Form.Control as="textarea" row={1} placeholder="Describe within 60 characters" maxLength="60" value={description} onChange={(e)=>{setDescription(e.target.value)}} onBlur={validateDescription}/>
          <Form.Text className="text-danger">{descriptionError}</Form.Text>
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
        <Button variant="" className="btn-color" onClick={updateCourseData}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default EditCourseModal