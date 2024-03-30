import React from 'react'
import CourseCard from '../../components/CourseCard'
import { Button,Row } from 'react-bootstrap';

import AddCourseModal from '../../components/AddCourseModal';
import { useState } from 'react';
function CourseManagement() {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <>
    {/* add Course */}
    <div className="d-flex justify-content-between mb-3">
            <h4>Course Management</h4>
            <Button variant="" type="button" className="btn-color" onClick={handleShowModal}>
                Add Course
            </Button>
      </div>
      {/* course List */}
      <Row id="course-list">
          <CourseCard/>
      </Row>
      <AddCourseModal show={showModal} handleClose={handleCloseModal} />
    </>
  )
}

export default CourseManagement