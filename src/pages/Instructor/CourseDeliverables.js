import React from 'react'
import { Row } from 'react-bootstrap';
import InstructorCourseCard from '../../components/InstructorCard';
function CourseDeliverables() {
  return (
    <>
    <h4 className="mb-3">Course Deliverables</h4> 
    <Row>
      {/* Instructor Courses */}
        <InstructorCourseCard/>
    </Row>
    </>
  )
}

export default CourseDeliverables