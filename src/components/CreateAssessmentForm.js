import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addAssessmentToJson } from '../slices/AssessmentSlice';

const CreateAssessmentForm = () => {
  const currentUserId=localStorage.getItem('currentUser');  
  const currentUser=JSON.parse(currentUserId)
  const [assessname,setAssessname]=useState("");
  const [assesscode,setAssesscode]=useState("");
  const [assessdate,setAssessdate]=useState("");
  const [time,setTime]=useState("");
  const [assessnameError,setAssessnameError]=useState("");
  const [assesscodeError,setAssesscodeError]=useState("");
  const [assessdateError,setAssessdateError]=useState("");
  const [TimeError,setTimeError]=useState("");
  const dispatch=useDispatch();

  // validate assessment name
  const validateAssessName = () => {
    let nameRegex = /^[a-zA-Z][a-zA-Z0-9@#$.]*$/;
    if(!assessname.trim()||!nameRegex.test(assessname.trim())){
      setAssessnameError("required")
    }
    else{
      setAssessnameError("");
    }
  };
  // validate assessment code
  const validateAssessCode = () => {
    let codeRegex = /^[a-zA-Z][a-zA-Z0-9@#$.]*$/;
    if(!assesscode.trim()||!codeRegex.test(assesscode.trim())){
      setAssesscodeError("required")
    }
    else{
      setAssesscodeError("");
    }
  };
  // validate date
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

  // validate time
  const validateTime = () => {
  if (time==="") {
    setTimeError("required")
  } else {
    setTimeError("");
  }
  };


  // add assess
  const addAssess = () => {
    validateAssessName();
    validateAssessCode();
    validateDate();
    validateTime();
    if(assessnameError || assesscodeError||assessdateError||TimeError || assessname==="" || assesscode==="" || assessdate===""||time===""){
      console.log("error");
      return;
    }
    else{
        console.log("success")
        dispatch(addAssessmentToJson({userId:currentUser.id,name:assessname,code:assesscode,date:assessdate,time:time}))
        setAssessname("");
        setAssesscode("");
        setAssesscode("");
        setAssessdate("");
        setTime("");
    }

  };
  return (
    // form
    <div className="container-fluid shadow p-3">
      <Row id="create-assess">
        <Col md={3}>
          <Form.Group controlId="assess-name">
            <Form.Label className='fw-medium'>Assessment Name<span className="text-danger"> *</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Assessment name"
              value={assessname}
              onChange={(e)=>{setAssessname(e.target.value)}}
              onKeyUp={validateAssessName}
              aria-label="default input example"
            />
            <span id="n-error" className='text-danger'>{assessnameError}</span>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="assess-code">
            <Form.Label className='fw-medium'>Code<span className="text-danger"> *</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Assessment code"
              value={assesscode}
              onChange={(e)=>{setAssesscode(e.target.value)}}
              onKeyUp={validateAssessCode}
              aria-label="default input example"
            />
            <span id="c-error" className='text-danger'>{assesscodeError}</span>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="assess-date">
            <Form.Label className='fw-medium'>Date<span className="text-danger"> *</span></Form.Label>
            <Form.Control type="date" value={assessdate}
              onChange={(e)=>{setAssessdate(e.target.value)}} onBlur={validateDate} aria-label="default input example" />
            <span id="d-error" className='text-danger'>{assessdateError}</span>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group controlId="assess-startTime" className="mb-3">
            <Form.Label className='fw-medium'>Time Duration(min)<span className="text-danger"> *</span></Form.Label>
            <Row>
              <Col md={12}>
                <Form.Control
                  type="number" value={time}
                  onChange={(e)=>{setTime(e.target.value)}} 
                  placeholder='enter in minutes'
                  onBlur={validateTime} min={0}
                  aria-label="default input example"
                />
                <span id="st-error" className='text-danger'>{TimeError}</span>
              </Col>
            </Row>
            <Button variant="color" className="w-100 mt-3" onClick={addAssess}>
              Create Assessment
            </Button>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default CreateAssessmentForm;
