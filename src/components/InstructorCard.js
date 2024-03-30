import React, { useEffect } from 'react';
import { Col, Card, Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../assets/sass/style.scss"
import { useDispatch, useSelector } from 'react-redux';
import { getEnrolledCoursesDetails } from '../slices/CourseSlice';
const InstructorCourseCard = () => {
  const currentUserId=localStorage.getItem('currentUser');  
  const currentUser=JSON.parse(currentUserId)
  const enrolledCourses = useSelector((state) => state.course.enrolledCourses);
  const dispatch = useDispatch();
  useEffect(() => {
    // Fetch enrolled courses details only if the currentUser and enrolledCourses are available
    if (currentUser && currentUser.coursename.length > 0 && enrolledCourses.length === 0) {
      const enrolledCourseIds = currentUser.coursename.map(course => course.id);
      dispatch(getEnrolledCoursesDetails(enrolledCourseIds));
    }
  }, [currentUser, enrolledCourses, dispatch]);
  return (
    <>
    <div className="row m-1" style={{paddingLeft:"2px"}}>
    {enrolledCourses.map((course)=>(
    <div className="col-lg-6 col-md-12 col-sm-12 mb-3" key={course.id}>
      <Card className="mb-3 coursecard" style={{ maxWidth: '550px' }}>
        <Row className='g-0'>
          <Col md={5}>
          <Link to={`/instructor/course-deliverables/upload/${course.id}`}>
            <Card.Img src={course.coverphoto} className="img-fluid rounded-start h-100" alt="course-Img" />
          </Link>
          </Col>
          <Col md={7}>
            <Card.Body>
              <Card.Title>
              <Link to={`/instructor/course-deliverables/upload/${course.id}`} className="text-decoration-underline">
                  {course.coursename}
                </Link>
              </Card.Title>
              <Card.Text>{course.description}</Card.Text>
              <Row className="mb-3">
                <Col md={12}>
                  <h6>Duration</h6>
                  <p className="card-text duration">{course.duration} hrs</p>
                </Col>
              </Row>
              <Link to={`/instructor/course-deliverables/upload/${course.id}`} className='text-decoration-none'>
              <div className="d-flex justify-content-between">
                <Button variant="" className='btn-color w-100'>
                  Upload Materials
                </Button>
              </div>
              </Link>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
    ))}
    </div>
    </>
  ); 
};

export default InstructorCourseCard;
