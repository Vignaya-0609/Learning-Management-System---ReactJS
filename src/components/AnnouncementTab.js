// AnnouncementTab.jsx
import React, { useState,useEffect } from 'react';
import { Row, Col, Form, Button, Table} from 'react-bootstrap';
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { useDispatch,useSelector } from 'react-redux';
import { addAnnouncementToJson, getAnnouncementFromJson, setSelectedAnnouncement } from '../slices/AnnouncementSlice';
import EditAnnouncementModal from './EditAnnouncementModal';
import DeleteAnnounceModal from './DeleteAnnounceModal';
import { getEnrolledCoursesDetails } from '../slices/CourseSlice';
const AnnouncementTab = () => {
  const selectedAnnouncement = useSelector((state) => state.announcement.selectedAnnouncement);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseModal1 = () => setShowModal1(false);


  const dispatch=useDispatch();
  // const currentUser=useSelector((state)=>state.user.currentUser);
  const currentUserId=localStorage.getItem('currentUser'); 
  const currentUser=JSON.parse(currentUserId)
  const enrolledCourses=useSelector((state)=>state.course.enrolledCourses);
  // const courseList=useSelector((state)=>state.course.courseList);
  const [option,setOption]=useState([]);
  const announcements = useSelector((state) => state.announcement.AnnounceList);

  const [course, setCourse] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const [announceError,setAnnounceError]=useState('');
  const [announceCourseError,setAnnounceCourseError]=useState('');
  const [filteredAnnouncements,setFilteredAnnouncements]=useState([]);
  useEffect(()=>{
    dispatch(getAnnouncementFromJson());
  },[dispatch])
  useEffect(() => {
    // Fetch enrolled courses details only if the currentUser and enrolledCourses are available
    if (currentUser && currentUser.coursename.length > 0 && enrolledCourses.length === 0) {
      const enrolledCourseIds = currentUser.coursename.map(course => course.id);
      dispatch(getEnrolledCoursesDetails(enrolledCourseIds));
    }
  }, [currentUser, enrolledCourses, dispatch]);
  useEffect(() => {
    if (enrolledCourses.length > 0) {
      setOption(enrolledCourses.map((course) => ({ id: course.id, name: course.coursename })));
    }
  }, [enrolledCourses]);
  useEffect(() => {
    const filtered = announcements.filter((announce) =>
      enrolledCourses.some((enrolled) => enrolled.id === announce.coursename.id) &&
      announce.instructorId === currentUser.id
    );
    setFilteredAnnouncements(filtered);
  }, [enrolledCourses, announcements, currentUser]);

  const validateAnnounce=()=>{
    if(!announcement.trim()){
      setAnnounceError("required")
    }
    else{
      setAnnounceError("");
    }
  }

  const validateAnnounceCourse=()=>{
    if(course===""){
      setAnnounceCourseError("required")
    }
    else{
      setAnnounceCourseError("");
    }
  }
  let editAnnouncement=(announcement)=>{
    dispatch(setSelectedAnnouncement(announcement));
    setShowModal(true);
  }
  const deleteAnnouncement=(announcement)=>{
    dispatch(setSelectedAnnouncement(announcement));
    setShowModal1(true);
    // console.log("clicked")
  }
  const addAnnouncement = () => {
    validateAnnounce();
    validateAnnounceCourse();
  
    if (course && announcement) {
      const date = new Date(); 
  
      const courseObject = enrolledCourses.find(enrolled => enrolled.coursename === course);
      const courseId = courseObject ? courseObject.id : null;
  
      if (courseId) {
        const announcementData = {
          date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`, 
          coursename: { id: courseId, name: course },
          announcement,
          instructor:currentUser.username, 
          instructorId:currentUser.id  
        };
        dispatch(addAnnouncementToJson(announcementData));
        setCourse('');
        setAnnouncement('');
      }
    }
  };
  

  return (
    // form to add announcements
    <div className="container-fluid p-2">
      <Row className="mb-3">
        <Col md={3} id="announce-form">
          <h6>Course Name</h6>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => setCourse(e.target.value)}
            value={course}
            onBlur={validateAnnounceCourse}
          >
            <option value="" disabled>Select Course</option>
            {option.map((courseOption) => (
              <option key={courseOption.id} value={courseOption.name}>
                {courseOption.name}
              </option>
            ))}
          </Form.Select>
          <span className='text-danger'>{announceCourseError}</span>
        </Col>
        <Col md={9}>
          <h6>Announcement</h6>
          <div className="input-group">
            <Form.Control
              type="text"
              id="announce"
              placeholder="Announce Here!"
              onChange={(e) => setAnnouncement(e.target.value)}
              value={announcement}
              onKeyUp={validateAnnounce}
            />
            <Button variant="" className="btn-color" type="button" onClick={addAnnouncement}>Send</Button>
          </div>
          <span className='text-danger'>{announceError}</span>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h4 className='mb-3'>Announcement</h4>
          <div className="container-fluid table-responsive mt-3 p-2">
            <Table>
              <thead>
                <th>Date</th>
                <th>Course Name</th>
                <th>Announcement</th>
                <th>Action</th>
              </thead>
              <tbody id="announce-table">
              {filteredAnnouncements.slice().reverse().map((announcement, index) => (
                <tr key={index}>
                  <td>{announcement.date}</td>
                  <td>{announcement.coursename.name}</td>
                  <td>{announcement.announcement}</td>
                  <td><Button variant="" className='p-2'><FaRegEdit className='d-flex justify-content-center text-dark' onClick={() => editAnnouncement(announcement)}/></Button> &nbsp; <Button variant="" className='p-2'><MdDeleteSweep className='d-flex justify-content-center' onClick={() => deleteAnnouncement(announcement)}/></Button></td>
                </tr>
               ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
      <EditAnnouncementModal show={showModal} handleClose={handleCloseModal}/>
      <DeleteAnnounceModal show={showModal1} handleClose={handleCloseModal1} selectedAnnouncement={selectedAnnouncement}/>
    </div>
  );
};

export default AnnouncementTab;
