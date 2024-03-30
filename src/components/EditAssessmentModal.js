import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { Row, Col, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateAssessmentToJson } from '../slices/AssessmentSlice';
function EditAssessmentModal({show,handleClose}) {
  const [id,setId]=useState('');
  const [assessname,setAssessname]=useState("");
  const [assesscode,setAssesscode]=useState("");
  const [assessdate,setAssessdate]=useState("");
  const [Time,setTime]=useState("");
  const [assessnameError,setAssessnameError]=useState("");
  const [assesscodeError,setAssesscodeError]=useState("");
  const [assessdateError,setAssessdateError]=useState("");
  const [TimeError,setTimeError]=useState("");
  const selectedAssessment=useSelector((state)=>state.assessment.selectedAssessment);
  // console.log(selectedAssessment)
  const dispatch=useDispatch();
  useEffect(()=>{
    if(Object.keys(selectedAssessment).length!==0){
        setId(selectedAssessment.id);
        setAssessname(selectedAssessment.name);
        setAssesscode(selectedAssessment.code);
        setAssessdate(selectedAssessment.date);
        setTime(selectedAssessment.time);
    }
  },[selectedAssessment])
  const validateAssessName = () => {
    let nameRegex = /^[a-zA-Z][a-zA-Z0-9@#$.]*$/;
    if(!assessname.trim()||!nameRegex.test(assessname.trim())){
      setAssessnameError("valid name is required")
    }
    else{
      setAssessnameError("");
    }
  };
  const validateAssessCode = () => {
    let codeRegex = /^[a-zA-Z][a-zA-Z0-9@#$.]*$/;
    if(!assesscode.trim()||!codeRegex.test(assesscode.trim())){
      setAssesscodeError("required")
    }
    else{
      setAssesscodeError("");
    }
  };
  const validateDate = () => {
    let enteredDate = new Date(assessdate);
  
  if (!isNaN(enteredDate.getTime())) {
    let currentDate = new Date();
    
    enteredDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);
    
    if (enteredDate < currentDate) {
      setAssessdateError("Start date should not be in the past");
    } else {
      setAssessdateError("");
    }
  } else {
    setAssessdateError("required");
  }
  };

  const validateTime = () => {
  if (Time==="") {
    setTimeError("required")
  } else {
    setTimeError("");
  }
  };


  const updateAssessment=()=>{
    validateAssessName();
    validateAssessCode();
    validateDate();
    validateTime();
    if(assessnameError||assesscodeError||assessdateError||TimeError||!assessname||!assesscode||!assessdate||!Time){
        console.log("error");
        return;
    }
    else{
        handleClose();
        dispatch(updateAssessmentToJson({id,name:assessname,code:assesscode,date:assessdate,time:Time}));
    }
  }

  return (
    <>
    <Modal show={show} onHide={handleClose} className="modal-lg" id={id}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Assessment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Row>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label className='fw-medium'>Assessment Name<span className="text-danger"> *</span></Form.Label>
          <Form.Control type="text" placeholder="Enter assessment name" value={assessname} onChange={(e)=>{setAssessname(e.target.value)}}
              onKeyUp={validateAssessName}/>
          <Form.Text className="text-danger">{assessnameError}</Form.Text>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label className='fw-medium'>Assessment Code<span className="text-danger"> *</span></Form.Label>
          <InputGroup>
            <Form.Control type="text" placeholder="Enter assessment code" value={assesscode} onChange={(e)=>{setAssesscode(e.target.value)}}
              onKeyUp={validateAssessCode}/>
          </InputGroup>
          <Form.Text className="text-danger">{assesscodeError}</Form.Text>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label className='fw-medium'>Date<span className="text-danger"> *</span></Form.Label>
          <Form.Control type="date" value={assessdate} onChange={(e)=>{setAssessdate(e.target.value)}} onBlur={validateDate}/>
          <Form.Text className="text-danger">{assessdateError}</Form.Text>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group className="mb-3">
          <Form.Label className='fw-medium'>Time Duration (in min)<span className="text-danger"> *</span></Form.Label>
          <Form.Control type="number" placeholder="time duration in minutes" value={Time} onChange={(e)=>{setTime(e.target.value)}} 
                  onBlur={validateTime}/>
          <Form.Text className="text-danger">{TimeError}</Form.Text>
        </Form.Group>
      </Col>
    </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="" className="btn-color" onClick={updateAssessment} >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default EditAssessmentModal