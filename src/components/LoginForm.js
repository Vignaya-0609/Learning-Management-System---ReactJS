import React, {useEffect} from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { getUsersFromJson } from '../slices/UserSlice';
import { getCoursesFromJson, getEnrolledCoursesDetails } from '../slices/CourseSlice';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../assets/sass/style.scss";

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const userList=useSelector((state)=>state.user.userList);
  const dispatch=useDispatch();
  // get from server
  useEffect(() => {
    dispatch(getUsersFromJson());
    dispatch(getCoursesFromJson());
  }, [dispatch]);

  // validate name
  const validateName = () => {
    let nameRegex = /^[a-zA-Z\s_]*$/;
    if (!username.trim() || !nameRegex.test(username.trim())) {
      setUsernameError('Valid Username is required');
    } else {
      setUsernameError('');
    }
  };

  // validate password
  const validatePassword = () => {
    if (!password) {
      setPasswordError('Valid Password is required');
    }else {
      setPasswordError('');
    }
  };

  // login
  const handleLogin = async (e) => {
    e.preventDefault();
    validateName();
    validatePassword();

      if (Array.isArray(userList) && userList.length > 0) {
        const matchingUser = userList.find(
          (user) => user.username === username && user.password === password
        );
  
        if (matchingUser) {
          // dispatch(setCurrentUser({ username: matchingUser.username, usertype: matchingUser.usertype,password:matchingUser.password,email:matchingUser.email,id:matchingUser.id,course:matchingUser.coursename,education:matchingUser.education,phoneno:matchingUser.phoneno }));
  
          switch (matchingUser.usertype) {
            case 'admin':
              navigate('/admin');
              localStorage.setItem("currentUser",JSON.stringify(matchingUser))
              break;
            case 'instructor':
              navigate('/instructor');
              localStorage.setItem("currentUser",JSON.stringify(matchingUser))
              break;
            case 'student':
              navigate('/student');
              localStorage.setItem("currentUser",JSON.stringify(matchingUser))
              break;
            default:
              console.log('Unknown user type');
          }

  
          if (matchingUser.coursename.length > 0) {
            const enrolledCourseIds = matchingUser.coursename.map(course => course.id);
            dispatch(getEnrolledCoursesDetails(enrolledCourseIds));
          }
        } else {
          console.error("Invalid credentials");
          setUsernameError("valid username is required");
          setPasswordError("valid password is required");
          document.querySelector('.hint-button-container').classList.remove('d-none');
        }
      } else {
        console.error("No users found in the response");
      }    
  };
  
  return (
    <>
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter your username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
        <Form.Text className="text-danger">{usernameError}</Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <Form.Text className="text-danger">{passwordError}</Form.Text>
      </Form.Group>
      <Button variant="" type="submit" className="w-100 btn-color">
        Login
      </Button>
      <div className='mt-2 d-none hint-button-container' onClick={handleShow}>
      <Button variant="" className='text-decoration-underline'>
        Hint
      </Button>
      </div>
      <div className="text-center mt-2 forget">
          <Link to="/forgetPassword" target='_blank'>Forget Password</Link>
      </div>
    </Form>
    {/* hint */}
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hint</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Student</h6>
          <p>Username: Ani</p>
          <p>Password: ani@12345</p>
          <h6>Instructor</h6>
          <p>Username: David</p>
          <p>Password: david@123</p>
          <h6>Admin</h6>
          <p>Username: dev_admin</p>
          <p>Password: dev@12345</p>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default LoginForm;