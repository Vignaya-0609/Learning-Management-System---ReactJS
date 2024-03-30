import React, { useEffect } from 'react';
// import Accordions from '../../components/Accordions';
import ReportAccordion from '../../components/ReportAccordion';
import AssessCard from '../../components/AssessCard';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { getEnrolledCoursesDetails } from '../../slices/CourseSlice';
function Assessment() {
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
    {/* assessment */}
      <h4 className="mb-3">Assessment</h4>
      {enrolledCourses.map((course)=>(
      <ReportAccordion key ={course.id} name={course.coursename}>
        <Row className='d-flex'>
          <Col>
          <AssessCard courseId={course.id}/>
          </Col>
        </Row>
      </ReportAccordion>
      
    ))} 
    </>
  );
}

export default Assessment;
