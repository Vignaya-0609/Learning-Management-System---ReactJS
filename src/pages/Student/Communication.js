import React, { useEffect } from 'react';
import { Tab, Nav } from 'react-bootstrap';
import Announcement from "../../components/StudentAnnounce";
import ChatTab from '../../components/ChatTab';
import { useDispatch, useSelector } from 'react-redux';
import { getEnrolledCoursesDetails } from '../../slices/CourseSlice';
import { getAnnouncementFromJson } from '../../slices/AnnouncementSlice';

const Communication = () => {
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
  useEffect(()=>{
    dispatch(getAnnouncementFromJson());
  },[dispatch])
  const AnnounceList=useSelector((state)=>state.announcement.AnnounceList);
  // console.log(AnnounceList)
  const filteredAnnouncements = AnnounceList.filter((announcement) =>
  enrolledCourses.some((course) => 
    course.id === announcement.coursename.id || 
    course.name === announcement.coursename.name
  )
);
  // console.log(filteredAnnouncements)
  return(
  <>
  <h4 className="mb-3">Communication</h4> 
    <div className="container-fluid mt-5">
      <Tab.Container id="myTabs" defaultActiveKey="content1">
        <Nav justify variant="tabs" className="nav-justified">
          <Nav.Item>
            <Nav.Link eventKey="content1" className="fw-medium">Announcement</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="content2" className="fw-medium">Chat</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="mt-3">
          {/* Announcement Tab */}
          <Tab.Pane eventKey="content1">
          {filteredAnnouncements.length === 0 ? (
              <p>No announcements</p>
            ) : (
              filteredAnnouncements.slice().reverse().map((announcement)=>(
                <Announcement
                  key={announcement.id} 
                  date={announcement.date}
                  courseName={announcement.coursename.name}
                  instructor={announcement.instructor}
                  announcement={announcement.announcement}
                />
              ))
            )}
          
          </Tab.Pane>

          {/* Chat Tab */}
          <Tab.Pane eventKey="content2">
            <ChatTab/>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
    </>
  );
  };

export default Communication;
