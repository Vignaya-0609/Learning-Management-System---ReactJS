import React, { useEffect, useState } from 'react';
import { Container, Row, Col  } from 'react-bootstrap';
import { Link,useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCheck } from "react-icons/fa";
import { getCoursesFromJson } from '../../slices/CourseSlice';
import { getUsersFromJson } from '../../slices/UserSlice';

const CourseDetails = () => {
  const currentUserId=localStorage.getItem('currentUser');  
  const currentUser=JSON.parse(currentUserId)
  console.log(currentUser)
  const { id } = useParams();
  const { courseList} = useSelector((state) => state.course);
  const { userList } = useSelector((state) => state.user); 
  // courses
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getCoursesFromJson());
    dispatch(getUsersFromJson());
 },[dispatch])
  const course = Array.isArray(courseList) ? courseList.find((course) => course.id === id) : null;
  const [participants, setParticipants] = useState([]);
  
  useEffect(() => {
    const usersWithCourse = userList.filter(user => user.coursename && user.coursename.some(course => course.id === id));
    setParticipants(usersWithCourse);
  }, [id, userList]);

// format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${day}-${month}-${year}`;
};

  return (
    <div>
    <div aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item fs-4"><Link to="/admin/course-management">Course Management</Link></li>
          <li className="breadcrumb-item fs-4 active" aria-current="page">{course ? course.coursename : 'Loading...'}</li>
        </ol>
    </div>
      {/* Content about course */}
      <Container className="shadow rounded-2">
        <Row className="p-2">
          <Col md={4}>
            <h5>Course Name</h5>
            <p>{course.coursename}</p>
          </Col>
          <Col md={4}>
            <h5>Duration</h5>
            <p>{course.duration} hrs</p>
          </Col>
          <Col md={4}>
            <h5>Start Date</h5>
            <p><date>{formatDate(course.startdate)}</date></p>
          </Col>
          <Col md={4}>
            <h5>End Date</h5>
            <p><date>{formatDate(course.enddate)}</date></p>
          </Col>
          <Col md={4}>
            <h5>Technology Stack</h5>
            <p>{course.stack}</p>
          </Col>
          <Col md={4}>
            <h5>Description</h5>
            <p>{course.description}</p>
          </Col>
        </Row>

        <hr />

        {/* Participants */}
        <Container className="table-responsive p-3">
          <h5 className='mb-3'>Participants</h5>
          <ul className='list-unstyled '>
          {participants.map(participant => (
          <li key={participant.id}>
            <div className=' fs-6' style={{lineHeight:"2"}}><FaUserCheck className='fw-bold mb-1'/> {participant.username}</div> 
          </li>
          ))}
        </ul>
        </Container>
      </Container>
    </div>
  );
};
export default CourseDetails;
