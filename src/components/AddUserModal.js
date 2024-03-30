import React, { useState,useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Row, Col, Form } from 'react-bootstrap';
import Select from "react-dropdown-select";
import { useDispatch, useSelector } from 'react-redux';
import { addUserToJson } from '../slices/UserSlice';
const AddUserModal = ({ show, handleClose }) => {
  const courseList=useSelector((state)=>state.course.courseList);
  const [options,setOptions]=useState([]);
  const [username,setUsername]=useState("");
  const [email,setUseremail]=useState("");
  const [password,setUserpassword]=useState("");
  const [usertype,setUsertype]=useState("");
  const [coursename,setCoursename]=useState([]);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userTypeError, setUserTypeError] = useState('');
  const [courseNameError, setCourseNameError] = useState('');
  const [userTypeTouched, setUserTypeTouched] = useState(true);
  const dispatch=useDispatch();
  useEffect(() => {
    const adminOption = {
      id: "admin",
      name: "None",
    };
  
    setOptions([...courseList.map(course => ({ id: course.id, name: course.coursename })),adminOption]);
  }, [courseList]);
  
  // validate username
  const validateUserName=()=>{
    let nameRegex = /^[a-zA-Z\s_]*$/;
    if (!username.trim() || !nameRegex.test(username.trim())) {
     
      setUsernameError('Valid Username is required');

    } else {
      
      setUsernameError('');
    }
  }

  // validate user email
  const validateUserEmail=()=>{
    const emailRegex = /^[a-zA-Z]+[a-zA-Z0-9]+@[a-z]+[.]+[a-z]{2,3}$/;
    const emailRegex2 = /^[a-zA-Z0-9]+[a-zA-Z0-9]+@[a-z]+[.]+[a-z]+[.]+[a-z]{2,3}$/;

    if (email.trim().match(emailRegex) || email.trim().match(emailRegex2)) {
      setEmailError('');
    } else {
      setEmailError('Valid Email is required');
    }
  }

  // validate user password
  const validateUserPassword=()=>{
    if (!password.trim()) {
      setPasswordError('Password is required');
    } else if (password.trim().length < 8) {
      setPasswordError('Password must be at least 8 characters');
    } else {
      setPasswordError('');
    }
  }

  // validate user type
  const validateUserType=()=>{
    if(userTypeTouched && usertype===""){
      setUserTypeError('User Type is required');
    }
    else{
      setUserTypeError('');
    }
  }

  // validate coursename
const handleSelectChange = (values) => {
  if (!values || !values.length) {
    console.log("No values selected or values is undefined.");
    return;
  }

  let updatedCoursename;

  if (values.some(value => value.id === "admin")) {
    updatedCoursename = [""];
  } else {
    updatedCoursename = values;
  }

  validateCourseName(updatedCoursename);
};



const validateCourseName = (updatedCoursename) => {
  if (!updatedCoursename || updatedCoursename.length === 0 ) {
    setCourseNameError('Please select a valid course name');
  } else {
    setCourseNameError('');
    setCoursename(updatedCoursename);
  }
};
  const resetval=()=>{
    setUsername('');
    setUseremail('');
    setUserpassword('');
    setUsertype('');
    setCoursename([]);
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setUserTypeError('');
    setCourseNameError('');
  }

  // helper function
  const validateAll=()=>{
    validateUserName();
    validateUserEmail();
    validateUserPassword();
    validateUserType();
    validateCourseName();

  }
  // add user
  const addUser = () => {
  validateAll();
  
  if (
    usernameError || emailError || passwordError || userTypeError ||
    courseNameError||username===""||email===""||password===""||usertype===""||coursename.length===0
  ) {
    console.log("Validation failed. Please check your inputs.");
    return;
  } else {
    dispatch(addUserToJson({username,email,password,usertype,coursename}))
    // console.log("Adding user:", username, email, password,usertype,coursename);
  }
  resetval();
  handleClose();
};
  return (
    <Modal show={show} onHide={handleClose} className="modal-lg">
      <Modal.Header closeButton> 
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Row>
      <Col md={6} className="p-2">
        <Form.Group className="mb-3">
          <Form.Label className='fw-medium'>User Name<span className="text-danger"> *</span></Form.Label>
          <Form.Control type="text" id="name" placeholder="UserName" value={username} onChange={(e)=>{setUsername(e.target.value)}} onKeyUp={validateUserName}/>
          <Form.Text className="text-danger" id="usererror">{usernameError}</Form.Text>
        </Form.Group>
      </Col>
      <Col md={6} className="p-2">
        <Form.Group className="mb-3">
          <Form.Label className='fw-medium'>Email<span className="text-danger"> *</span></Form.Label>
          <Form.Control type="email" id="email" placeholder="Enter mail address" value={email} onChange={(e)=>{setUseremail(e.target.value)}} onKeyUp={validateUserEmail} />
          <Form.Text className="text-danger" id="emailerror">{emailError}</Form.Text>
        </Form.Group>
      </Col>
      <Col md={6} className="p-2">
        <Form.Group className="mb-3">
          <Form.Label className='fw-medium'>Password<span className="text-danger"> *</span></Form.Label>
          <Form.Control type="password" id="password" placeholder="Enter password" value={password} onChange={(e)=>{setUserpassword(e.target.value)}} onKeyUp={validateUserPassword}/>
          <Form.Text className="text-danger" id="pswrderror">{passwordError}</Form.Text>
        </Form.Group>
      </Col>
      <Col md={6} className="p-2">
        <Form.Group className="mb-3">
          <Form.Label className='fw-medium'>User Type<span className="text-danger"> *</span></Form.Label>
          <Form.Select id="type" value={usertype} onChange={(e)=>{setUsertype(e.target.value);validateUserType();setUserTypeError("")}} onBlur={()=>{setUserTypeTouched(true);
    validateUserType();}}>
            <option value="" disabled>Choose Type</option>
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </Form.Select>
          <Form.Text className="text-danger" id="typeerror">{userTypeError}</Form.Text>
        </Form.Group>
      </Col>
      <Col md={6} className="p-2">
        <Form.Group className="mb-3">
          <Form.Label className='fw-medium'>Course Name<span className="text-danger"> *</span></Form.Label>

          <Select 
            options={options}
            labelField="name"
            valueField="id"
            multi
            value={coursename}
            onChange={handleSelectChange}
            style={{
              borderRadius:"5px",
              border:"1px solid #adadad",
              padding:"7px",
            }}
        />
          <Form.Text className="text-danger" id="courseerror">{courseNameError}</Form.Text>
        </Form.Group>
      </Col>
    </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={resetval}>
          Reset
        </Button>
        <Button variant="" className="btn-color" onClick={addUser}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUserModal;
