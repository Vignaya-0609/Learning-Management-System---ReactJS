import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Row, Col, Form } from 'react-bootstrap';
import Select from "react-dropdown-select";
import { useDispatch, useSelector } from 'react-redux';
import { updateUserToJson } from '../slices/UserSlice';

function EditUserModal({ show, handleClose }) {
  const courseList = useSelector((state) => state.course.courseList);
  const [username, setUsername] = useState("");
  const [email, setUseremail] = useState("");
  const [password, setUserpassword] = useState("");
  const [usertype, setUsertype] = useState("");
  const [coursename, setCoursename] = useState([]);
  const [id, setId] = useState(0);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userTypeError, setUserTypeError] = useState('');
  const [courseNameError, setCourseNameError] = useState('');
  const [userTypeTouched, setUserTypeTouched] = useState(true);
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(selectedUser).length !== 0) {
      setUsername(selectedUser.username);
      setUseremail(selectedUser.email);
      setUserpassword(selectedUser.password);
      setUsertype(selectedUser.usertype);
      setCoursename(selectedUser.coursename|| []);
      setId(selectedUser.id);
    }
  }, [selectedUser]);

  const adminOption = {
    id: "admin",
    name: "None",
  };

  const options = [...courseList.map(course => ({ id: course.id, name: course.coursename })), adminOption];

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

  // validate password
  const validateUserPassword=()=>{
    if (!password.trim()) {
      setPasswordError('Password is required');
    } else if (password.trim().length < 8) {
      setPasswordError('Password must be at least 8 characters');
    } else {
      setPasswordError('');
    }
  }
  // validate userType
  const validateUserType=()=>{
    if(userTypeTouched && usertype===""){
      setUserTypeError('User Type is required');
    }
    else{
      setUserTypeError('');
    }
  }
  // validate coursename
  // validate course name
const validateCourseName = () => {
  if (coursename.length === 0) {
    setCourseNameError('course name is required');
  } else {
    setCourseNameError('');
  }
}


  // edit
  const editUser = () => {
    
    validateUserName();
    validateUserEmail();
    validateUserPassword();
    validateUserType();
    validateCourseName();
    if (
      usernameError || emailError || passwordError || userTypeError ||courseNameError ||username===""||email===""||password===""||usertype==="" ||coursename.length===0
    ){
      console.log("error");
      return;
    }
    else{
      let updatedCoursename;
      if (coursename.some(courseId => courseId === "admin")) {
        updatedCoursename = [""];
      } else {
        updatedCoursename = coursename.map(courseId => {
          const foundCourse = courseList.find(course => course.id === courseId);
          return foundCourse ? { id: courseId, name: foundCourse.coursename } : null;
        }).filter(course => course !== null);
      }
      
        dispatch(updateUserToJson({ id, username, email, password, usertype, coursename:updatedCoursename }));
      };
      handleClose();
    }

  




  return (
    <>
      <Modal show={show} onHide={handleClose} className="modal-lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6} className="p-2">
              <Form.Group className="mb-3">
                <Form.Label className='fw-medium'>User Name<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="text" id="name" placeholder="UserName" value={username} onChange={(e)=>{setUsername(e.target.value)}} onBlur={validateUserName}/>
                <Form.Text className="text-danger" id="usererror">{usernameError}</Form.Text>
              </Form.Group>
            </Col>
            <Col md={6} className="p-2">
              <Form.Group className="mb-3">
                <Form.Label className='fw-medium'>Email<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="email" id="email" value={email} placeholder="Enter mail address" onChange={(e)=>{setUseremail(e.target.value)}} onBlur={validateUserEmail} />
                <Form.Text className="text-danger" id="emailerror">{emailError}</Form.Text>
              </Form.Group>
            </Col>
            <Col md={6} className="p-2">
              <Form.Group className="mb-3">
                <Form.Label className='fw-medium'>Password<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="password" id="password" value={password} placeholder="Enter password" onChange={(e)=>{setUserpassword(e.target.value)}} onBlur={validateUserPassword} />
                <Form.Text className="text-danger" id="pswrderror">{passwordError}</Form.Text>
              </Form.Group>
            </Col>
            <Col md={6} className="p-2">
              <Form.Group className="mb-3">
                <Form.Label className='fw-medium'>User Type<span className="text-danger"> *</span></Form.Label>
                <Form.Select id="type" value={usertype} onChange={(e)=>{setUsertype(e.target.value)}} onBlur={()=>{setUserTypeTouched(true);
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
                  values={coursename.map(course => {
                      const id = typeof course === 'object' ? course.id : course;
                      const foundCourse = courseList.find(course => course.id === id);
                      return { id, name: foundCourse ? foundCourse.coursename : "None" };
                  })}
                  // onChange={(values) => setCoursename(values.map(course => course.id))}
                  onChange={(values) => {
                    setCoursename(values.map(course => course.id));
                    setCourseNameError('');
                  }}
                  multi
                  style={{
                    borderRadius: "5px",
                    border: "1px solid #adadad",
                  }}
                />
                <Form.Text className="text-danger" id="typeerror">{courseNameError}</Form.Text>
              </Form.Group>
              
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" className="btn-color" onClick={editUser}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUserModal;
