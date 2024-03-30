// CourseCard.js
import React, {useEffect, useState} from 'react';
import { Col, Card, Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../assets/sass/style.scss"
import EditCourseModal from './EditCourseModal';
import { useDispatch, useSelector } from 'react-redux';
import { getCoursesFromJson, setSelectedcourse } from '../slices/CourseSlice';
import DeleteCourseModal from './DeleteCourseModal';

const CourseCard = () => {
  const selectedCourse=useSelector((state)=>state.course.selectedCourse)
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const dispatch=useDispatch();
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal1 = () => setShowModal1(true);
  const handleCloseModal1 = () => setShowModal1(false);
  const {courseList}=useSelector((state)=>state.course);
  // edit
  const editCourse=(course)=>{
    dispatch(setSelectedcourse(course));
    handleShowModal();
  }
  // delete
  const deleteCourse=(course)=>{
    dispatch(setSelectedcourse(course));
    handleShowModal1();
  }
  useEffect(()=>{
    dispatch(getCoursesFromJson());
  },[dispatch])

  return (
    <>
    <div className="row m-1" style={{paddingLeft:"2px"}}>
    {/* course List */}
    {courseList && courseList.map((course)=>(
    <div className="col-lg-6 col-md-12 col-sm-12 mb-3" key={course.id}>
      <Card className="mb-3 coursecard" style={{ maxWidth: '550px' }}>
        <Row className="g-0">
          <Col md={5}>
          <Link to={`/admin/course-management/details/${course.id}`}>
            <Card.Img src={course.coverphoto} className="img-fluid  rounded-start h-100" alt="course-Img" />
          </Link>
          </Col>
          <Col md={7}>
            <Card.Body>
              <Card.Title>
              <Link to={`/admin/course-management/details/${course.id}`} className="text-decoration-underline">
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
              <div className="d-flex justify-content-between p-1">
              <Button variant="" type="button" className="btn-color" onClick={() => editCourse(course)}>
                Edit
            </Button>
                <Button variant="" className='btn-color' onClick={()=>deleteCourse(course)}>Delete</Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  
     ))}
       </div>
     {/* edit & delete */}
    <EditCourseModal show={showModal} handleClose={handleCloseModal} />
    <DeleteCourseModal show={showModal1} handleClose={handleCloseModal1} selectedcourse={selectedCourse}/>
    </>
  );
};

export default CourseCard;
