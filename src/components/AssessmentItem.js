import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import EditAssessmentModal from './EditAssessmentModal';
import { deleteAssessmentFromJson, setSelectedAssessment } from '../slices/AssessmentSlice';
import { addPublishToJson, getPublishFromJson } from '../slices/PublishSlice';
const AssessmentItem = ({id, assessment }) => {
  const dispatch=useDispatch();
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [showModal1, setShowModal1] = useState(false);
  const handleShowModal1 = () => setShowModal1(true);
  const handleCloseModal1 = () => setShowModal1(false);
  const [showModal2, setShowModal2] = useState(false);
  const handleShowModal2 = () => setShowModal2(true);
  const handleCloseModal2 = () => setShowModal2(false);
  const [selectCourse, setSelectCourse] = useState('');
  const [selectCourseError,setSelectCourseError]=useState("");
  const selectedAssessment=useSelector((state)=>state.assessment.selectedAssessment);
  const enrolledCourses=useSelector((state)=>state.course.enrolledCourses);
  console.log(selectedAssessment)
  const publishList = useSelector((state) => state.publish.publishList);
  const isPublishedAssessment = publishList.some((publishedAssessment) => publishedAssessment.assessId === assessment.id);
//    console.log(isPublishedAssessment)
//    console.log('assessment.id:', assessment.id);
// console.log('publicList:', publishList);

useEffect(()=>{
  dispatch(getPublishFromJson());
},[dispatch])
  

  // edit
  const EditAssess=(assessment)=>{
    dispatch(setSelectedAssessment(assessment));
    handleShowModal()
  }
  // delete
  const deleteAssess=(assessment)=>{
    dispatch(setSelectedAssessment(assessment));
    handleShowModal1();
  }
  // confirm delete
  const handleDelete=()=>{
    dispatch(deleteAssessmentFromJson(assessment));
    handleCloseModal1();

  }
  const publish = () => {
    if (selectCourse) {
        
        // Dispatch action to add published assessment
        dispatch(addPublishToJson({ courseId:selectCourse, assessId: assessment.id }));
        setSelectCourseError("");
        handleCloseModal2();
      } else {
        setSelectCourseError("Invalid course name");
      }
  };
  

  // format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };


  return (
    <Container fluid className="p-3 rounded mb-3" key={id}>
      <Row className="mb-3 shadow p-2">
        <Col md={3}>
          <h6>Assessment Name</h6>
          <p>{assessment.name}</p>
        </Col>
        <Col md={2}>
          <h6>Code</h6>
          <p>{assessment.code}</p>
        </Col>
        <Col md={2}>
          <h6>Date</h6>
          <p>{formatDate(assessment.date)}</p>
        </Col>
        <Col md={5}>
          <h6>Time</h6>
          <Row className="mb-3">
            <Col md={12}>
              <p>{assessment.time} min</p>
            </Col>
          </Row>
          {isPublishedAssessment ? (
            <Link to={`/instructor/assessment/add/${assessment.id}`}>
              <Button variant="color" className="w-30 mb-3 btn-color">
                View Questions
              </Button>
            </Link>
          ) : (
            <Link to={`/instructor/assessment/add/${assessment.id}`}>
              <Button variant="color" className="w-30 mb-3 btn-color">
                Add Questions
              </Button>
            </Link>
          )}&nbsp;
          {/* <Link to={`/instructor/assessment/add/${assessment.id}`}>
          <Button variant="color" className="w-30 mb-3 btn-color">
            Add Questions
          </Button></Link>&nbsp; */}
          {!isPublishedAssessment && (
            <>
              <Button variant="color" className="w-30 mb-3 btn-color" onClick={()=>EditAssess(assessment)}>
                Edit
              </Button>&nbsp;
              <Button variant="color" className="w-30 mb-3 btn-color" onClick={()=>deleteAssess(assessment)}>
                Delete
              </Button>&nbsp;
            </>
          )}
          {/* <Button variant="color" className="w-30 mb-3 btn-color" onClick={()=>EditAssess(assessment)}>
            Edit
          </Button>&nbsp;
          <Button variant="color" className="w-30 mb-3 btn-color" onClick={()=>deleteAssess(assessment)}>
            Delete
          </Button>&nbsp; */}
          {!isPublishedAssessment ? (
          <Button variant="success" className="w-30 mb-3" onClick={handleShowModal2}>Publish</Button>
          ) : (
          <Button variant="success" className="w-30 mb-3" disabled>Published</Button>
        )}
        </Col>
      </Row>
      {/* edit */}
      <EditAssessmentModal show={showModal} handleClose={handleCloseModal}/>
      {/* delete */}
      <Modal show={showModal1} onHide={handleCloseModal1}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h5>Are you Sure?</h5>
        <p>Do you really want to delete?</p> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal1}>
            Cancel
          </Button>
          <Button variant="" className='btn-color' onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* publish */}
      <Modal show={showModal2} onHide={handleCloseModal2}>
        <Modal.Header closeButton>
          <Modal.Title>Publish</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h6>Publish To</h6>
        <Form.Control as="select" value={selectCourse} onChange={(e) => setSelectCourse(e.target.value)}>
          <option value="" disabled>Select Course</option>
          {enrolledCourses.map(course => (
          <option key={course.id} value={course.id}>{course.coursename}</option>
        ))}
        </Form.Control>
        <span className='text-danger'>{selectCourseError}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal2}>
            Cancel
          </Button>
          <Button variant="" className='btn-color' onClick={publish}>
            Publish
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AssessmentItem;
